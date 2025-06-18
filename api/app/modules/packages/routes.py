from fastapi import APIRouter, Depends

from api.app.database import db_session
from api.app.modules.auth.security import get_current_user
from .services import *

router = APIRouter(
    prefix="/packages",
    tags=["packages"],
    dependencies=[Depends(get_current_user)]
)


@router.get('/')
async def get_all_packages(query: filter_query, db: db_session):
    return db_get_all_package(query, db)


@router.post('/')
async def add_package(package: PackageCreate, db: db_session):
    return db_add_package(package, db)


@router.put('/{id}')
async def edit_package(id: uuid.UUID, package_data: PackageUpdate, db: db_session):
    return db_edit_package(id, package_data, db)
