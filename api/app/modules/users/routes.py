from fastapi import APIRouter

from api.app.database import db_session
from api.app.dependencies import current_user
from .services import *

router = APIRouter(
    prefix="/users",
    tags=["users"],
)


@router.get('/', response_model=UsersPublic)
async def get_user_info(user: current_user, session: db_session):
    return db_get_user_info(user.id, session)


@router.patch('/', status_code=status.HTTP_202_ACCEPTED, response_model=UsersPublic)
async def update_user_account(user_data: UsersUpdate, user: current_user, session: db_session):
    return db_update_profile(user_data, user.id, session)


@router.delete('/', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user_account(user: current_user, session: db_session):
    return db_delete_account(user.id, session)
