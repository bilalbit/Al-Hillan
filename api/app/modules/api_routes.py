from fastapi import APIRouter

from api.app.modules.public.routes import router as public_router
from api.app.modules.users.routes import router as users_router
from api.app.modules.courses.routes import router as courses_router
from api.app.modules.packages.routes import router as packages_router
from api.app.modules.students.routes import router as students_router
from api.app.modules.registers.routes import router as register_router
from api.app.modules.payments.routes import router as payments_router


# API router for all versioned API routes under /v1/api
# New module routers should be included here (e.g., include_router(new_module_router))
api_routes = APIRouter(
    prefix="/v1/api"
)

api_routes.include_router(public_router)
api_routes.include_router(users_router)
api_routes.include_router(courses_router)
api_routes.include_router(packages_router)
api_routes.include_router(students_router)
api_routes.include_router(register_router)
api_routes.include_router(payments_router)
