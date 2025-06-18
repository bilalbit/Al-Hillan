import uuid
from datetime import date
from enum import Enum
from typing import Annotated

from fastapi import Query
from sqlmodel import Field, SQLModel, Relationship

from api.app.core.models import Mixin, FilterParams
from api.app.modules.packages.models import Package


class CourseFilter(FilterParams):
    is_available: bool = True


course_filter_query = Annotated[CourseFilter, Query()]  # Used in routes to parse query parameters (e.g., ?limit=10&offset=20)


class CourseType(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"
    special = "special"


class CourseBase(SQLModel):
    title: str = Field(min_length=3, max_length=50, index=True, unique=True)
    category: CourseType
    youtube_url: str = Field(min_length=3, index=True, unique=True)
    num_of_students: int = 0
    duration: date
    startDate: date
    description: str = Field(min_length=3, max_length=500)


class Course(CourseBase, Mixin, table=True):
    id: uuid.UUID | None = Field(primary_key=True, index=True, default_factory=uuid.uuid4)
    is_available: bool = Field(default=True)

    package: "Package" = Relationship(back_populates="course")


class CourseCreate(CourseBase):
    pass


class CourseUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=3, max_length=50, index=True, unique=True)
    category: CourseType | None = None
    youtube_url: str | None = None
    num_of_students: int | None = None
    duration: date | None = None
    startDate: date | None = None
    description: str | None = Field(default=None, min_length=3, max_length=500)


class CoursePublic(CourseBase):
    id: uuid.UUID
