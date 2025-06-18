from fastapi import HTTPException, status
from sqlmodel import select, Session

from api.app.core.models import RoleType
from api.app.modules.auth.utils import verify_password, hash_password
from api.app.modules.users.models import User, UsersCreate
from .models import TokenPayload


def get_user_by_username(username: str, db_session: Session) -> User | None:
    """
    Retrieve a user from the database by their username.

    Args:
        username (str): The username to search for.
        db_session (AsyncSession): The database session.

    Returns:
        User | None: The user object if found, otherwise None.
    """
    return db_session.exec(
        select(User).where(User.username == username)
    ).first()


def create_user_account(user_data: UsersCreate, role: RoleType, db_session: Session) -> User:
    """
    Create a new user account with a specified role and hashed password.

    Args:
        user_data (UsersCreate): The user data for creating the account.
        role (RoleType): The role to assign to the user.
        db_session (AsyncSession): The database session.

    Returns:
        User: The created user object.
    """
    hashed_password = hash_password(user_data.password)
    extra_data = {"hashed_password": hashed_password, "role": role}
    db_user = User.model_validate(user_data, update=extra_data)
    db_session.add(db_user)
    db_session.commit()
    db_session.refresh(db_user)
    return db_user


def register_user(user_data: UsersCreate, db_session: Session) -> User:
    """
    Register a new user with a hashed password.

    Args:
        user_data (UsersCreate): The user data for registration.
        db_session (AsyncSession): The database session.

    Returns:
        User: The registered user object.
    """
    hashed_password = hash_password(user_data.password)
    extra_data = {"hashed_password": hashed_password}
    db_user = User.model_validate(user_data, update=extra_data)
    db_session.add(db_user)
    db_session.commit()
    db_session.refresh(db_user)
    return db_user


def authenticate_user(username: str, password: str, db_session: Session) -> TokenPayload:
    """
    Authenticate a user by verifying their username and password.

    Args:
        username (str): The username of the user.
        password (str): The password to verify.
        db_session (AsyncSession): The database session.

    Returns:
        TokenPayload: The authenticated user's schema.

    Raises:
        HTTPException: If the username or password is incorrect (404).
    """
    db_user = get_user_by_username(username, db_session)
    if db_user is None or not verify_password(db_user.hashed_password, password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="incorrect username or password")
    return TokenPayload(
        id=db_user.id,
        username=db_user.username,
        role=db_user.role
    )
