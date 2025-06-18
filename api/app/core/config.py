from functools import lru_cache
from pathlib import Path
from typing import Annotated

from fastapi import Depends
from pydantic_settings import BaseSettings, SettingsConfigDict

# Compute the absolute path to .env (relative to project root)
BASE_DIR = Path(__file__).resolve().parent.parent.parent  # app/core -> app -> project root
ENV_FILE = BASE_DIR / ".env"


class Settings(BaseSettings):
    database_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int
    refresh_token_expire_days: int
    salt: str

    ##phone number validator
    supported_regions: list
    default_region: str
    number_format: str

    # project status
    environment: str

    ##cors
    allow_origins: list

    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_prefix="APP_",
        env_file_encoding="utf-8",
        case_sensitive=False
    )


# use this for getting .env configs
@lru_cache
def get_settings() -> Settings:
    """
    Retrieve the application settings, cached for performance.

    Uses `lru_cache` to ensure the `Settings` object is instantiated only once,
    reducing overhead in production. Loads configuration from environment variables
    or the `.env` file specified in `Settings.model_config`.

    Returns:
        Settings: The application settings object.

    Example:
        settings = get_settings()
        print(settings.database_url)
    """
    return Settings()


# Dependency for injecting settings into FastAPI routes or services
# use this dependency for testing purpose only(it reduce performance) use get_settings() for the reset
setting_dep = Annotated[Settings, Depends(get_settings)]
