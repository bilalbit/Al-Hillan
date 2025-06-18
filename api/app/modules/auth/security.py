import uuid
from datetime import datetime, timezone, timedelta
from typing import Annotated

import jwt
from fastapi import HTTPException, Depends, status, Response
from fastapi.requests import Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import PyJWTError
from sqlmodel import Session, select

from api.app.core.config import get_settings
from api.app.core.models import RoleType
from api.app.database import db_session, engine
from .models import TokenPayload, RefreshToken

# OAuth2 scheme for extracting JWT tokens from Authorization header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login",
                                     auto_error=False)  # making Authorization header Optional for authenticating using cookies

token_dependency = Annotated[str, Depends(oauth2_scheme)]  # Dependency for injecting token from request


async def create_access_token(user: TokenPayload,
                              expires_delta: timedelta = get_settings().access_token_expire_minutes):
    # Prepare payload for JWT encoding
    encode = {
        "id": str(user.id),  # Convert UUID to string for JWT
        "username": user.username,  # Access username from UserSchema
        "role": str(user.role.value),  # Convert RoleType enum to string
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expires_delta),  # Set expiration time
        "type": "access"
    }
    # Encode JWT using secret_key and algorithm from settings
    encode_jwt = jwt.encode(encode, get_settings().secret_key, algorithm=get_settings().algorithm)
    return encode_jwt


async def create_refresh_token(user: TokenPayload,
                               expires_delta: timedelta = get_settings().access_token_expire_minutes):
    # Prepare payload for JWT encoding
    encode = {
        "id": str(user.id),  # Convert UUID to string for JWT
        "username": user.username,  # Access username from UserSchema
        "role": str(user.role.value),  # Convert RoleType enum to string
        "exp": datetime.now(timezone.utc) + timedelta(days=expires_delta),  # Set expiration time
        "type": "refresh"
    }
    # Encode JWT using secret_key and algorithm from settings
    encode_jwt = jwt.encode(encode, get_settings().secret_key, algorithm=get_settings().algorithm)
    return encode_jwt


async def get_token(request: Request, token: str | None = Depends(oauth2_scheme)) -> tuple[str | None, str | None]:
    # Get tokens from cookies
    access_token = request.cookies.get("access_token")
    refresh_token = request.cookies.get("refresh_token")

    # Fallback to Authorization header for access token
    if not access_token and token:
        access_token = token

    return access_token, refresh_token


async def verify_token(db: db_session, request: Request, tokens: tuple[str | None, str | None] = Depends(get_token)):
    access_token, refresh_token = tokens

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    # Try validating access token
    try:
        if not access_token:
            raise PyJWTError("No access token provided")
        payload = jwt.decode(access_token, get_settings().secret_key, algorithms=[get_settings().algorithm])
        if payload.get("type") != "access":
            raise credentials_exception
        username: str = payload.get("username")
        id: str = payload.get("id")
        role: str = payload.get("role")
        if username is None or id is None or role is None:
            raise credentials_exception
        try:
            role = RoleType(role)
        except ValueError:
            raise credentials_exception
        return TokenPayload(id=id, username=username, role=role)
    except PyJWTError:
        # Access token invalid/expired, try refresh token
        if not refresh_token:
            raise credentials_exception

        # Validate refresh token
        try:
            payload = jwt.decode(refresh_token, get_settings().secret_key, algorithms=[get_settings().algorithm])
            if payload.get("type") != "refresh":
                raise credentials_exception
            username: str = payload.get("username")
            id: str = payload.get("id")
            role: str = payload.get("role")
            if username is None or id is None or role is None:
                raise credentials_exception
            try:
                role = RoleType(role)
            except ValueError:
                raise credentials_exception

            # Check refresh token in database
            statement = select(RefreshToken).where(RefreshToken.user_id == uuid.UUID(id),
                                                   RefreshToken.refresh_token == refresh_token,
                                                   RefreshToken.expires_at > datetime.now(timezone.utc))
            db_refresh_token = db.exec(statement).first()
            if not db_refresh_token:
                raise credentials_exception

            # Generate new access token
            user = TokenPayload(id=id, username=username, role=role)
            new_access_token = await create_access_token(user)
            # Optionally generate new refresh token
            # Update refresh token in database
            db_refresh_token.expires_at = datetime.now(timezone.utc) + timedelta(
                days=get_settings().refresh_token_expire_days)
            db.commit()

            # Store new tokens in request state for cookie-setting
            request.state.new_access_token = new_access_token

            return user
        except PyJWTError:
            raise credentials_exception


async def get_current_user(request: Request, response: Response,
                           tokens: tuple[str | None, str | None] = Depends(get_token)):
    user = await verify_token(db=Session(engine), request=request, tokens=tokens)

    # Set new tokens in cookies if they were generated
    if hasattr(request.state, "new_access_token"):
        response.set_cookie(
            key="access_token",
            value=request.state.new_access_token,
            httponly=True,
            secure=False,  # Use in production with HTTPS
            samesite="lax",
            max_age=int(get_settings().access_token_expire_minutes * 60),
        )

    return user


async def create_cookie_session(user: TokenPayload, db: db_session):
    """
    Create a session by generating access and refresh tokens and setting them in cookies.

    Args:
        user (TokenPayload): User data including ID, username, and role.
        db (db_session): Database session for storing the refresh token.

    Returns:
        Token: Access token and token type, with cookies set for access and refresh tokens.

    Raises:
        Exception: If database operations fail (e.g., unable to store refresh token).
    """
    access_token = await create_access_token(user)
    refresh_token = await create_refresh_token(user)

    # Store refresh token in database
    db_token = RefreshToken(refresh_token=refresh_token, user_id=user.id)
    db.add(db_token)
    db.commit()

    # Create response with access token
    response = JSONResponse(content={"access_token": access_token, "token_type": "bearer"})

    # Set cookies for access and refresh tokens
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Use in production with HTTPS
        samesite="lax",
        max_age=get_settings().access_token_expire_minutes * 60
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,  # Use in production with HTTPS
        samesite="lax",##?
        max_age=get_settings().refresh_token_expire_days * 24 * 60 * 60
    )
    return response
