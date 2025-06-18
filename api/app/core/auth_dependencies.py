from typing import Annotated

from fastapi import HTTPException, Depends

from api.app.core.models import RoleType, ErrorResponse
from api.app.modules.auth.models import TokenPayload
from api.app.modules.auth.security import verify_token


async def check_admin_only(user: Annotated[TokenPayload, Depends(verify_token)]) -> TokenPayload:
    """
    Dependency to restrict access to admin users only.

    Verifies that the user has an 'admin' role based on the JWT token payload.
    This check relies on the token's role data and does not query the database,
    meaning role changes (e.g., revoking admin status) require the user to log in
    again to receive an updated token. Raises an HTTP 403 error if the user is not
    an admin.

    Args:
        user (Annotated[TokenPayload, Depends(verify_token)]): The token payload
            containing user data, obtained from the verified JWT token.

    Returns:
        TokenPayload: The verified user payload if the user is an admin.

    Raises:
        HTTPException: Status code 403 with an ErrorResponse if the user is not an admin.

    Note:
        This function does not perform real-time database checks for the user's role.
        If a user's role changes in the database, they must log in again to update
        their token. For real-time role validation, consider querying the database
        within this function.
    """
    if user.role.value != RoleType.admin.value:
        raise HTTPException(
            status_code=403,
            detail=ErrorResponse(
                detail="Insufficient permissions",
                status_code=403,
                error_code="insufficient_permissions"
            ).model_dump()
        )
    return user
# async def check_admin_only(request: Request):
#     user = db_get_user_info(request.state.user_id)
#     print(user.role.value != RoleType.admin.value)
#     if user.role.value != RoleType.admin.value:
#         raise HTTPException(
#             status_code=403,
#             detail=ErrorResponse(
#                 detail="Insufficient permissions",
#                 status_code=403,
#                 error_code="insufficient_permissions"
#             ).model_dump()
#         )
#     return user
