import uuid
from datetime import date
from enum import Enum
from typing import TYPE_CHECKING

from sqlmodel import Field, SQLModel, Relationship

from api.app.core.models import PhoneNumber

if TYPE_CHECKING:
    from api.app.modules.payments.models import Payment
    from api.app.modules.registers.models import Register


class StudentStatus(str, Enum):
    active = "active"
    inactive = "inactive"
    suspended = "suspended"


class StudentBase(SQLModel):
    first_name: str = Field(min_length=3)
    middle_name: str = Field(min_length=3)
    last_name: str | None = Field(default=None,nullable=True, min_length=3)
    phone_number: PhoneNumber = Field(unique=True,index=True)
    date_of_birth: date | None = Field(
        default=None,
        nullable=True,
        index=True,
    )


class Student(StudentBase, table=True):
    id: uuid.UUID | None = Field(primary_key=True, index=True, default_factory=uuid.uuid4)

    status: StudentStatus = Field(default=StudentStatus.active)
    registration_date: date | None = Field(
        default_factory=lambda: date.today(),
        nullable=False,
        index=True,
    )
    register: list["Register"] = Relationship(back_populates="student")
    payment: list["Payment"] = Relationship(back_populates="student")

class StudentPublic(StudentBase):
    id: uuid.UUID

class StudentCreate(StudentBase):
    pass


class StudentUpdate(SQLModel):
    first_name: str | None = Field(default=None, min_length=3)
    middle_name: str | None = Field(default=None, min_length=3)
    last_name: str | None = Field(default=None, min_length=3)
    phone_number: PhoneNumber | None = None