import uvicorn
from fastapi import FastAPI

from api.app.core.config import setting_dep
from api.app.core.exceptions import exception_handlers
from api.app.core.lifespan import lifespan
from api.app.core.middleware import register_middleware
from api.app.modules.api_routes import api_routes
from api.app.modules.auth.routes import router as auth_router

# Initialize FastAPI app with custom OpenAPI metadata and exception handlers
app = FastAPI(
    title="Al-Hillan Academy",
    description="Al-Hillan Academy",
    version="1.0.0",
    exception_handlers=exception_handlers,
    lifespan=lifespan,
)

register_middleware(app)

@app.get("/healthy")
async def healthy():
    """
    Health check endpoint to verify the application is running.

    Returns:
        dict: Status message indicating the app is healthy.
    """
    return {"status": "Healthy"}


@app.get("/test-settings")
async def get_env_info(setting: setting_dep):
    """
    Retrieve environment configuration settings.

    Args:
        setting: Injected settings dependency from `app.core.config`.
    Returns:
        Settings object containing configuration details (e.g., environment, allow_origins).
    """
    return setting


# Include versioned API routes from modules
app.include_router(api_routes)

# Include Auth from auth module and it should be separated from other api routes
app.include_router(auth_router)

if __name__ == "__main__":
    """
    Run the application using Uvicorn for development.

    Configures the server to run on localhost:8000 with auto-reload for development.
    For production, use Gunicorn with Uvicorn workers (e.g., `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`).
    """
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
