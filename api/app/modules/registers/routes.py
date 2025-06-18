from fastapi import APIRouter, Depends

from api.app.database import db_session
from api.app.modules.auth.security import get_current_user
from .services import *

router = APIRouter(
    prefix="/register",
    tags=["register"],
    dependencies=[Depends(get_current_user)]
)


@router.get('/')
async def get_all_registered(register_date: date,  db: db_session,course_title:str = None):
    return db_get_all_registered(register_date, course_title, db)


@router.get('/analytics/month')
async def get_student_registrations_by_month(db: db_session):
    return db_get_student_registrations_by_month(db)


@router.get('/analytics/year')
async def get_student_registrations_by_year(db: db_session):
    return db_get_student_registrations_by_year(db)


