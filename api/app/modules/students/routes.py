from fastapi import APIRouter, Depends

from api.app.database import db_session
from api.app.modules.auth.security import get_current_user
from .services import *

router = APIRouter(
    prefix="/students",
    tags=["students"],
    dependencies=[Depends(get_current_user)]
)

@router.get('/')
async def get_all_students(register_date: date, db: db_session):
    return db_get_all_students(register_date, db)


@router.post('/')
async def add_students(students_data: StudentCreate, db: db_session):
    return db_add_students(students_data, db)


@router.put('/{id}')
async def edit_students(id: uuid.UUID, students_data: StudentUpdate, db: db_session):
    return db_edit_students(id, students_data, db)


@router.delete('/{id}')
async def delete_students(id: uuid.UUID, student_status: StudentStatus, db: db_session):
    return db_delete_students(id,student_status, db)
