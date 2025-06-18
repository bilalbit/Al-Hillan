from datetime import timedelta

from fastapi import HTTPException, status
from sqlmodel import Session, select, func,desc

from .models import *


def db_get_all_students(registration_date: date, session: Session):
    statement = select(Student).where(Student.registration_date <= registration_date,
                                      Student.registration_date >= (registration_date - timedelta(days=30))).order_by(
        desc(Student.registration_date)
    )
    db_student = session.exec(statement).all()
    total_count_query = select(func.count()).select_from(Student)
    total_count = session.exec(total_count_query).one()
    return {
        "total_count": total_count,
        "month_total_count": len(db_student),
        "data": db_student
    }


def db_add_students(student_data: StudentCreate, session: Session):
    db_student = Student.model_validate(student_data)
    session.add(db_student)
    session.commit()
    session.refresh(db_student)
    return db_student


def db_edit_students(id: uuid.UUID, students_data: StudentUpdate, session: Session):
    db_student = session.get(Student, id)
    if not db_student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    db_student_data = students_data.model_dump(exclude_unset=True)
    db_student.sqlmodel_update(db_student_data)
    session.add(db_student)
    session.commit()
    session.refresh(db_student)
    return db_student


def db_delete_students(id: uuid.UUID, student_status: StudentStatus, session: Session):
    db_student = session.get(Student, id)
    if not db_student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    db_student.status = student_status
    session.add(db_student)
    session.commit()
    session.refresh(db_student)
