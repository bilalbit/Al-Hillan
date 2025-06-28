from datetime import timedelta

from fastapi import HTTPException, status
from sqlmodel import Session, select, func,desc

from .models import *
from api.app.modules.packages.models import Package
from api.app.modules.courses.models import Course
from api.app.modules.students.models import Student
from api.app.modules.courses.services import increase_student_number_by_one


def db_register_student(phone_number: str, register_data: RegisterCreate, session: Session):
    db_student = session.exec(
        select(Student).where(Student.phone_number == phone_number)
    ).first()
    if not db_student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    # check if the student already registered with that package
    check_duplicate_register = session.exec(
        select(Register).where(
            Register.course_id == register_data.course_id,
            Register.student_id == db_student.id,
            Register.registration_date >= (date.today() - timedelta(days=30))
        )
    ).first()
    db_course = session.get(Course, register_data.course_id)
    if check_duplicate_register:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Student already Registered with in this Month")
    print(db_course)
    if not db_course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    increase_student_number_by_one(db_course.id, session)
    db_register = Register.model_validate(register_data, update={"student_id": db_student.id})
    session.add(db_register)
    session.commit()
    session.refresh(db_register)
    return db_register


def db_register_new_student(register_data: RegisterNewStudentCreate, session: Session):
    student_data = Student.model_dump(register_data, exclude={"registration_date"})
    db_student = Student.model_validate(student_data)

    db_register = Register.model_validate(register_data)
    db_register.student = db_student

    db_course = session.get(Course, register_data.course_id)
    if not db_course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    increase_student_number_by_one(db_course.id, session)

    session.add(db_register)
    session.commit()
    session.refresh(db_register)
    return db_register


def db_get_all_registered(
        register_date: date,
        course_title: str | None,
        session: Session,
):
    start_date = register_date - timedelta(days=30)
    statement = (
        select(
            Register.id,
            Student.first_name,
            Student.middle_name,
            Student.last_name,
            Student.phone_number,
            Student.id.label("student_id"),
            Course.title.label("course_title")
        )
        .join(Student, Register.student_id == Student.id)
        .join(Course, Register.course_id == Course.id)
        .where(
            Register.registration_date <= register_date,
            Register.registration_date >= start_date
        ).order_by(
            desc(Register.registration_date)
        )
    )
    # Query to get registrations with student and course details
    # Add course title filter if provided (case-insensitive)
    if course_title:
        statement = statement.where(
            func.lower(Course.title) == course_title.lower()
        )
    db_results = session.exec(statement).all()

    # Query to get total count of all registrations
    total_count_query = select(func.count()).select_from(Register)
    total_count = session.exec(total_count_query).one()

    # Format the results
    data = [
        {
            "registration_id": result.id,
            "first_name": result.first_name,
            "middle_name": result.middle_name,
            "last_name": result.last_name,
            "phone_number": result.phone_number,
            "course_title": result.course_title,
            "student_id": result.student_id
        }
        for result in db_results
    ]

    return {
        "total_count": total_count,
        "month_total_count": len(db_results),
        "data": data
    }


# def db_get_all_registered(register_date: date,session: Session):
#     statement = select(Register).where(Register.registration_date <= register_date,
#                                       Register.registration_date >= (register_date - timedelta(days=30)))
#     db_student = session.exec(statement).all()
#     total_count_query = select(func.count()).select_from(Register)
#     total_count = session.exec(total_count_query).one()
#     return {
#         "total_count": total_count,
#         "month_total_count": len(db_student),
#         "data": db_student
#     }


def db_get_student_registrations_by_month(session: Session):
    # Calculate the date 6 months ago
    six_months_ago = date.today() - timedelta(days=180)

    # Query to count registrations per month
    statement = (
        select(
            func.to_char(Register.registration_date, 'Month').label('month'),
            func.count().label('total_student')
        )
        .where(Register.registration_date >= six_months_ago)
        .group_by(func.to_char(Register.registration_date, 'Month'))
        .order_by(func.min(Register.registration_date))
    )

    results = session.exec(statement)

    # Format results as requested
    return [
        {"month": row.month.strip(), "total_student": row.total_student}
        for row in results
    ]


def db_get_student_registrations_by_year(session: Session):
    # Query to count registrations per year
    statement = (
        select(
            func.extract('year', Register.registration_date).label('year'),
            func.count().label('total_student')
        )
        .group_by(func.extract('year', Register.registration_date))
        .order_by(func.extract('year', Register.registration_date).desc())
    )

    results = session.exec(statement)

    # Format results as requested
    return [
        {"year": str(int(row.year)), "total_student": row.total_student}
        for row in results
    ]
