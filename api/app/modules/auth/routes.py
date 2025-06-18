from fastapi import APIRouter, Response, Request, Depends

from api.app.database import db_session
from api.app.dependencies import oauth2_form, current_user
from api.app.modules.auth.security import create_cookie_session, get_current_user, get_token
from .models import *
from .services import *

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UsersCreate, session: db_session):
    """
    Register a new user in the system.

    Args:
        user_data (UsersCreate): User registration data including username, password, and other details.
        session (db_session): Database session for performing queries.

    Returns:
        UsersResponse: The created user details.

    Raises:
        HTTPException: If the username or email already exists (handled in register_user).
    """
    user = register_user(user_data, session)
    return user


@router.get("/verify-token", response_model=TokenPayload)
async def verify_token(user: current_user):
    """
    Verify the authenticity of the current user's token.

    Args:
        user (TokenPayload): Current user data extracted from the token.

    Returns:
        TokenPayload: User details including ID, username, and role.

    Raises:
        HTTPException: If the token is invalid or expired (handled in get_current_user).
    """
    return user


@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login(form_data: oauth2_form, session: db_session):
    """
    Authenticate a user and create a session with access and refresh tokens.

    Args:
        form_data (OAuth2PasswordRequestForm): Login credentials (username and password).
        session (db_session): Database session for performing queries.

    Returns:
        Token: Access token and token type, with cookies set for access and refresh tokens.

    Raises:
        HTTPException: If authentication fails (invalid username or password).
    """
    user = authenticate_user(form_data.username, form_data.password, session)
    response = await create_cookie_session(user, session)
    return response



@router.post("/logout")
async def logout(
        request: Request,
        response: Response,
        db: db_session,
        tokens: tuple[str | None, str | None] = Depends(get_token),
        user: TokenPayload = Depends(get_current_user),
):
    """
    Log out the user by deleting the refresh token from the database and clearing cookies.

    Args:
        request (Request): HTTP request object to access cookies.
        response (Response): HTTP response object to set cookies.
        db (db_session): Database session for performing queries.
        tokens (tuple[str | None, str | None]): Access and refresh tokens from cookies or header.
        user (TokenPayload): Current user data extracted from the token.

    Returns:
        LogoutResponse: Confirmation message indicating successful logout.

    Raises:
        HTTPException: If the token is invalid or expired (handled in get_current_user).
    """
    access_token, refresh_token = tokens

    # Delete refresh token from database if it exists
    if refresh_token:
        db_refresh_token = db.query(RefreshToken).filter(
            RefreshToken.user_id == user.id,
            RefreshToken.token == refresh_token
        ).first()
        if db_refresh_token:
            db.delete(db_refresh_token)
            db.commit()

    # Clear access_token and refresh_token cookies
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=True,  # Use in production with HTTPS
        samesite="lax",
    )
    response.delete_cookie(
        key="refresh_token",
        httponly=True,
        secure=True,  # Use in production with HTTPS
        samesite="lax",
    )

    return {"message": "Successfully logged out"}