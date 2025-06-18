import uuid

from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from api.app.core.models import Mixin, PhoneNumber, RoleType


class UsersBase(SQLModel):
    username: str = Field(min_length=3, index=True, unique=True)
    email: EmailStr = Field(index=True, unique=True)
    first_name: str = Field(min_length=3)
    last_name: str = Field(min_length=3)
    phone_number: PhoneNumber = Field(index=True, unique=True)
    role: RoleType
    is_active: bool = True


class User(UsersBase, Mixin, table=True):
    id: uuid.UUID | None = Field(primary_key=True, index=True, default_factory=uuid.uuid4)
    hashed_password: str


class UsersCreate(UsersBase):
    password: str = Field(min_length=8)


class UsersUpdate(UsersBase):
    username: str | None = None
    email: EmailStr | None = None
    password: str | None = Field(default=None, min_length=8)
    first_name: str | None = None
    last_name: str | None = None
    phone_number: PhoneNumber | None = None
    is_active: bool | None = None
    role: RoleType | None = None


class UsersPublic(UsersBase):
    id: uuid.UUID
