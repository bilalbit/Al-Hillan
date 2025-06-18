from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.app.core.config import get_settings

# Retrieve settings for environment-specific configuration
settings = get_settings()


def register_middleware(app: FastAPI) -> None:
    """
    Register middleware for the FastAPI application.

    Args:
        app (FastAPI): The FastAPI application instance.

    Returns:
        None: Modifies the app in place by adding the middleware.

    Example:
        app = FastAPI()
        register_middleware(app)  # Adds CORS middleware to the app
    """
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        # allow_origins=settings.allow_origins if settings.environment == "production" else ["*"],
        allow_credentials=True,  # Allow cookies and credentials in cross-origin requests
        allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
        allow_headers=["*"]  # Allow all headers in requests
    )