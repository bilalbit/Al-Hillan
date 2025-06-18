from fastapi import APIRouter, Depends

from api.app.database import db_session
from api.app.modules.auth.security import get_current_user
from .services import *

router = APIRouter(
    prefix="/courses",
    tags=["courses"],
    dependencies=[Depends(get_current_user)]
)
@router.post('/')
async def add_courses(course_data: CourseCreate, db:db_session):
    return db_add_courses(course_data,db)

@router.put('/{id}')
async def edit_courses(id:uuid.UUID,course_data: CourseUpdate, db:db_session):
    return db_edit_courses(id,course_data,db)
@router.delete('/{id}')
async def delete_courses(id:uuid.UUID, db:db_session):
    return db_delete_courses(id,db)
@router.patch('/{id}')
async def retrieve_courses(id:uuid.UUID, db:db_session):
    return db_retrieve_courses(id,db)

@router.get('/')
def get_courses_without_packages(db:db_session):
    return db_get_courses_without_packages(db)

## get all course that doesn't have package