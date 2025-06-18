import uuid
from datetime import date
from decimal import Decimal
from enum import Enum

from sqlmodel import Field, SQLModel, Relationship

from api.app.modules.students.models import Student


class PaymentMethod(str, Enum):
    telebirr = "telebirr"
    cbe = "cbe"
    cbe_birr = "cbe-birr"


class PaymentStatus(str, Enum):
    verified = "verified"
    un_verified = "un-verified"
    failed = "failed"

class PlanType(str, Enum):
    monthly = "monthly"
    half_year = "half_year"
    yearly = "yearly"


class PaymentBase(SQLModel):
    package_id: uuid.UUID = Field(foreign_key="package.id")
    payment_method: PaymentMethod
    transaction: str = Field(unique=True, index=True)
    account_number: str | None = Field(default=None, nullable=True,index=True)
    plan: PlanType



class Payment(PaymentBase, table=True):
    id: uuid.UUID | None = Field(primary_key=True, index=True, default_factory=uuid.uuid4)
    status: PaymentStatus = PaymentStatus.un_verified
    amount: Decimal = Field(ge=1, decimal_places=2)

    student_id: uuid.UUID | None = Field(default=None, foreign_key="student.id")
    payment_date: date | None = Field(
        default_factory=lambda: date.today(),
        nullable=False,
        index=True,
    )
    student: list["Student"] = Relationship(back_populates="payment")


class PaymentCreate(PaymentBase):
    pass