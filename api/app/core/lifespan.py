from contextlib import asynccontextmanager

from fastapi import FastAPI

from api.app.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handle application startup and shutdown events.

    Startup:
        Optionally initializes the database (commented out; prefer Alembic migrations
        in production).
    Shutdown:
        Disposes the database engine to release connections.
    Yields control to the application during its lifetime.

    Example:
        async with lifespan(app):
            # Application runs
    """
    # Startup: Initialize resources

    create_db_and_tables()  # Uncomment for initial setup; prefer Alembic
    yield
    # Shutdown: Clean up resources
