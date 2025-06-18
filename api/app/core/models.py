# app/core/models.py
from datetime import datetime, timezone
from enum import Enum
from typing import Annotated, Literal

from fastapi import Query
from pydantic_extra_types.phone_numbers import PhoneNumberValidator
from sqlmodel import Field, SQLModel, DateTime

from api.app.core.config import get_settings


class Mixin(SQLModel):
    created_at: datetime | None = Field(
        default_factory=lambda: datetime.now(timezone.utc),  # Set creation time to current UTC time
        nullable=False,
        index=True,
        sa_type=DateTime(timezone=True)
    )
    updated_at: datetime | None = Field(
        default=None,
        sa_column_kwargs={"onupdate": lambda: datetime.now(timezone.utc)},
        index=True,
        sa_type=DateTime(timezone=True)
    )


class ErrorResponse(SQLModel):
    detail: str
    status_code: int
    error_code: str | None = None

    class Config:
        json_schema_extra = {
            "example": {
                "detail": "Resource not found",
                "status_code": 404,
                "error_code": "resource_not_found"
            }
        }  # Example response for OpenAPI documentation


class RoleType(str, Enum):
    admin = "admin"


class FilterParams(SQLModel):
    limit: int | None = Field(10, gt=0, le=100)
    offset: int | None = Field(0, ge=0)
    order_by: Literal["created_at", "updated_at"] | None = "created_at"
    # tags: list[str] | None = []


# Dependency for injecting FilterParams as query parameters
filter_query = Annotated[FilterParams, Query()]  # Used in routes to parse query parameters (e.g., ?limit=10&offset=20)

PhoneNumber = Annotated[
    str,
    PhoneNumberValidator(
        supported_regions=get_settings().supported_regions,
        default_region=get_settings().default_region,
        number_format=get_settings().number_format
    )
]
