# app/modules/auth/models.py
import uuid
from datetime import datetime, timezone, timedelta
from uuid import UUID

from sqlmodel import SQLModel, Field, DateTime

from api.app.core.config import get_settings
from api.app.core.models import RoleType


class Token(SQLModel):
    access_token: str
    token_type: str


class TokenPayload(SQLModel):
    """
    Pydantic model for structuring the response of verify_token in auth_dependencies.py.
    Represents the validated payload of a JWT token, containing user information.
    Not a database model (no table=True), used for API responses and dependency injection.
    """
    id: UUID  # Unique user identifier from JWT payload
    username: str = Field(min_length=3)  # Username with minimum length of 3 characters
    role: RoleType  # User role (e.g., RoleType.admin) from JWT payload

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "username": "admin-user",
                "role": "admin"
            }
        }


class RefreshToken(SQLModel, table=True):
    __tablename__ = "refresh_token"

    id: int = Field(primary_key=True, index=True)
    refresh_token: str = Field(index=True, unique=True)
    user_id: uuid.UUID = Field(index=True,foreign_key="user.id")
    expires_at: datetime | None = Field(
        default_factory=lambda: (datetime.now(timezone.utc) + timedelta(days=get_settings().refresh_token_expire_days)),
        # Set creation time to current UTC time
        nullable=False,
        index=True,
        sa_type=DateTime(timezone=True)
    )
