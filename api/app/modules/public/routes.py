import uuid

from fastapi import APIRouter

from api.app.core.models import PhoneNumber
from api.app.database import db_session
from api.app.modules.courses.models import course_filter_query
from api.app.modules.courses.services import db_get_all_courses, db_get_courses_with_packages
from api.app.modules.packages.services import db_get_course_package
from api.app.modules.payments.models import PaymentCreate
from api.app.modules.payments.services import db_verify_payment_status, db_add_payment
from api.app.modules.registers.models import RegisterNewStudentCreate, RegisterCreate
from api.app.modules.registers.services import db_register_new_student, db_register_student

router = APIRouter(
    prefix="/public",
    tags=["public routes"],
)


##change get all courses that have packages with
@router.get('/courses')
async def get_all_courses(query: course_filter_query, db: db_session):
    return db_get_all_courses(query, db)


@router.get('/courses/package')
async def get_courses_with_packages(db: db_session):
    return db_get_courses_with_packages(db)


@router.get('/packages/{course_id}')
async def get_all_package(course_id: uuid.UUID, db: db_session):
    return db_get_course_package(course_id, db)


@router.get('/payment/verify/{transaction}')
async def verify_payment_status(transaction: str, db: db_session):
    return db_verify_payment_status(transaction, db)


@router.post('/register')
async def register_new_student(register_data: RegisterNewStudentCreate, db: db_session):
    return db_register_new_student(register_data, db)


@router.post('/{phone_number}')
async def register_student(phone_number: PhoneNumber, register_data: RegisterCreate, db: db_session):
    return db_register_student(phone_number, register_data, db)

@router.post('/payment/{phone_number}')
async def add_payment(phone_number: PhoneNumber,payment_data: PaymentCreate, db:db_session):
    return db_add_payment(phone_number,payment_data, db)
