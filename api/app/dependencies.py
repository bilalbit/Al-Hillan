# dependencies.py
"""
Authentication dependencies for FastAPI routes.

This module defines dependencies for injecting the current user (via JWT token
verification) and OAuth2 form data into routes. It integrates with
`app.modules.auth.security` for token verification and is used in authentication
endpoints (e.g., login, protected routes).
`app.core.security` authorization logic
"""
from typing import Annotated

from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm

from api.app.core.auth_dependencies import check_admin_only
from api.app.modules.auth.models import TokenPayload
from api.app.modules.auth.security import get_current_user

# Dependency for injecting the current user based on JWT token verification
# Returns a TokenPayload object containing user details (e.g., sub, role)


###authentication and authorizaion
current_user = Annotated[TokenPayload, Depends(get_current_user)]

# Dependency for injecting OAuth2 form data (username, password) for login
# Used in login endpoints to process form submissions
# Example: @router.post("/login", form_data: oauth2_form)

oauth2_form = Annotated[OAuth2PasswordRequestForm, Depends()]

# Dependency for admin-only access
admin_user = Annotated[dict, Depends(check_admin_only)]
# admin_user: Annotated[dict, Depends(check_admin_only)] = Depends(check_admin_only)
"""
FastAPI dependency to restrict routes to admin users only.

This dependency uses `check_admin_only` to verify that the user has an 'admin' role
based on the JWT token payload. It can be used in route definitions to enforce
admin-only access.

Example:
    @router.get("/admin-only", response_model=SomeModel)
    def admin_route(user: admin_user):
        return {"message": "Admin access granted"}
"""
