# app/core/exception.py
import re

from fastapi import Request, status
from fastapi.responses import JSONResponse
from jwt import InvalidTokenError
from sqlalchemy.exc import IntegrityError, NoResultFound

from api.app.core.models import ErrorResponse  # Import standardized error response model

DUPLICATE_KEY_PATTERN = re.compile(r"Key \((.*?)\)=\((.*?)\) already exists")


async def duplicate_resource_exception_handler(request: Request, exc: IntegrityError) -> JSONResponse:
    """
    Handle IntegrityError (e.g., psycopg2.errors.UniqueViolation) for duplicate resources.
    Extracts key (e.g., 'email') and value (e.g., 'user@example.com') from the error message
    to provide a user-friendly response (e.g., "Email user@example.com already exists").
    Args:
        request: The incoming HTTP request (for context, unused in this handler).
        exc: The IntegrityError raised by SQLAlchemy (e.g., due to unique constraint violation).
    Returns:
        JSONResponse: A 409 Conflict response with a structured ErrorResponse.
    """
    detail = "Invalid data"  # Default message for non-unique-constraint errors
    error_message = str(exc)  # Convert exception to string for parsing
    # Extract key and value from PostgreSQL error message (e.g., "Key (email)=(user@example.com) already exists")
    match = DUPLICATE_KEY_PATTERN.search(error_message)
    if match:
        key, value = match.groups()  # Extract key (e.g., 'email') and value (e.g., 'user@example.com')
        detail = f"{key.capitalize()} {value} already exists"  # Format user-friendly message

    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,  # 409 Conflict for duplicate resources
        content=ErrorResponse(
            detail=detail,  # User-friendly error message
            status_code=status.HTTP_409_CONFLICT,
            error_code="duplicate_resource"  # Unique identifier for client-side handling
        ).model_dump()  # Serialize ErrorResponse to JSON-compatible dict
    )


async def resource_not_found_exception_handler(request: Request, exc: NoResultFound) -> JSONResponse:
    """
    Handle NoResultFound when a requested resource is not found in the database.
    Returns a 404 Not Found response with a standardized error message.
    Args:
        request: The incoming HTTP request (for context, unused in this handler).
        exc: The NoResultFound exception raised by SQLAlchemy (e.g., when a query returns no results).
    Returns:
        JSONResponse: A 404 Not Found response with a structured ErrorResponse.
    """
    # Note: PyUnusedLocal suppression is unnecessary unless linters complain about unused parameters
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,  # 404 Not Found for missing resources
        content=ErrorResponse(
            detail="Resource not found",  # Standard message for missing resources
            status_code=status.HTTP_404_NOT_FOUND,
            error_code="resource_not_found"  # Unique identifier for client-side handling
        ).model_dump()  # Serialize ErrorResponse to JSON-compatible dict
    )


async def invalid_token_error_handler(request: Request, exc: InvalidTokenError) -> JSONResponse:
    """
    Handle InvalidTokenError for invalid JWT tokens.
    Returns a 401 Unauthorized response.
    """
    return JSONResponse(
        status_code=status.HTTP_401_UNAUTHORIZED,
        content=ErrorResponse(
            detail="Could not validate credentials",
            status_code=status.HTTP_401_UNAUTHORIZED,
            error_code="auth_invalid_token"
        ).model_dump(),
        headers={"WWW-Authenticate": "Bearer"}
    )


# async def expired_signature_error_handler(request: Request, exc: ExpiredSignatureError) -> JSONResponse:
#     """
#     Handle ExpiredSignatureError for expired JWT tokens.
#     Returns a 401 Unauthorized response.
#     """
#     return JSONResponse(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         content=ErrorResponse(
#             detail="Token has expired",
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             error_code="auth_token_expired"
#         ).model_dump(),
#         headers={"WWW-Authenticate": "Bearer"}
#     )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """
    Fallback handler for unhandled exceptions.
    Returns a 500 Internal Server Error response to prevent leaking sensitive details.
    """
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            detail="Internal server error",
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            error_code="internal_error"
        ).model_dump()
    )


# Dictionary mapping exception types to their handlers for FastAPI registration
##psycopg2.errors.NotNullViolation
exception_handlers = {
    Exception: generic_exception_handler,
    IntegrityError: duplicate_resource_exception_handler,  # Map IntegrityError to its handler
    NoResultFound: resource_not_found_exception_handler,  # Map NoResultFound to its handler
    InvalidTokenError: invalid_token_error_handler,
    # ExpiredSignatureError: expired_signature_error_handler
}
