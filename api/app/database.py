# database.py
"""
Database configuration and session management for the FastAPI application.

This module sets up the SQLModel database engine using the database URL from
configuration settings, provides a FastAPI dependency for database sessions, and
includes a utility to create database tables. It is located at the project root
and integrates with `app.core.config` for settings and `app.core.services` for
database operations.
"""
from typing import Annotated

from fastapi import Depends
from sqlmodel import create_engine, SQLModel, Session

from api.app.core.config import get_settings
# noinspection PyUnresolvedReferences
from api.app.modules import *


# Retrieve database URL from settings (e.g., postgresql://user:password@localhost/db)
settings = get_settings()
database_url = settings.database_url

# Validate database URL to prevent empty or malformed configurations
if not database_url:
    raise ValueError("Database URL is not configured in settings")

engine = create_engine(
    database_url,
    pool_size=5,
    max_overflow=10,
    echo=settings.environment == "development"
)


def get_db_session():
    with Session(engine) as session:
        yield session



# Annotated dependency for type-safe session injection in FastAPI routes
db_session = Annotated[Session, Depends(get_db_session)]


def create_db_and_tables():
    """
    Create all database tables defined in SQLModel models.

    Uses SQLModel.metadata.create_all to generate tables based on model definitions.
    Intended for development or initial setup. For production, use Alembic migrations.

    Example:
        python database.py  # Creates tables when run as main
    """
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    """
    Entry point to create database tables when running the module directly.

    Useful for development or initial setup. Avoid running in production to prevent
    unintended schema changes; use Alembic migrations instead.
    """
    create_db_and_tables()
