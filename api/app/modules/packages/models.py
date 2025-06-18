import uuid
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlmodel import Field, SQLModel, Relationship

from api.app.core.models import Mixin

if TYPE_CHECKING:
    from api.app.modules.courses.models import Course


class PackageBase(SQLModel):
    course_type: uuid.UUID = Field(foreign_key="course.id", index=True,ondelete="CASCADE", unique=True,nullable=True)
    month_price: Decimal = Field(decimal_places=2, ge=1)
    half_year_price: Decimal = Field(decimal_places=2, ge=1)
    year_price: Decimal = Field(decimal_places=2, ge=1)


class Package(PackageBase, Mixin, table=True):
    id: uuid.UUID | None = Field(primary_key=True, index=True, default_factory=uuid.uuid4)

    course: "Course" = Relationship(back_populates="package")


class PackageCreate(PackageBase):
    pass


class PackagePublic(PackageBase):
    id: uuid.UUID
    course_title: str


class PackageUpdate(SQLModel):
    month_price: Decimal | None = Field(default=None, decimal_places=2, ge=1)
    half_year_price: Decimal | None = Field(default=None, decimal_places=2, ge=1)
    year_price: Decimal | None = Field(default=None, decimal_places=2, ge=1)
