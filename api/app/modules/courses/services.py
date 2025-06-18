from fastapi import HTTPException, status
from sqlmodel import Session, select, func, desc

from .models import *

def increase_student_number_by_one(course_id: uuid.UUID,session: Session):
    db_course = session.get(Course,course_id)
    if not db_course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Course not found")
    db_course.num_of_students += 1
    session.add(db_course)
    session.commit()



def db_get_all_courses(query: course_filter_query, session: Session):
    base_query = select(Course)

    # Calculate the total count of all courses (without pagination)
    total_count_query = select(func.count()).select_from(Course).where(Course.is_available == query.is_available)
    total_count = session.exec(total_count_query).one()

    # Apply pagination and ordering to the query
    statement = base_query.offset(query.offset).limit(query.limit)

    # Apply ordering based on query.order_by
    if query.order_by == "updated_at":
        statement = statement.order_by(desc(Course.updated_at))
    else:
        statement = statement.order_by(desc(Course.created_at))  # Default to created_at
    if query.is_available:
        statement = statement.where(Course.is_available == True)
    else:
        statement = statement.where(Course.is_available == False)

    print(statement)
    # Execute the paginated query
    db_courses = session.exec(statement).all()

    return {
        "total": total_count,
        "data": db_courses
    }


def db_add_courses(course_data: CourseCreate, session: Session):
    db_course = Course.model_validate(course_data)
    session.add(db_course)
    session.commit()
    session.refresh(db_course)
    return db_course


def db_edit_courses(id: uuid.UUID, course_data: CourseUpdate, session: Session):
    db_course = session.get(Course, id)
    if not db_course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    db_course_data = course_data.model_dump(exclude_unset=True)
    db_course.sqlmodel_update(db_course_data)
    session.add(db_course)
    session.commit()
    session.refresh(db_course)
    return db_course


def db_delete_courses(id: uuid.UUID, session: Session):
    db_course = session.get(Course, id)
    if not db_course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    session.delete(db_course)
    session.commit()
    # db_course.is_available = False
    # session.add(db_course)
    # session.commit()


def db_retrieve_courses(id: uuid.UUID, session: Session):
    db_course = session.get(Course, id)
    if not db_course:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    db_course.is_available = True
    session.add(db_course)
    session.commit()


def db_get_courses_without_packages(session: Session):
    statement = select(Course).outerjoin(Package).where(Package.id == None)
    results = session.exec(statement).all()
    return [
        {
            "label": course.title,
            "value": course.id
        }
        for course in results
    ]


def db_get_courses_with_packages(session: Session):
    statement = select(Course).outerjoin(Package).where(Package.id != None)
    results = session.exec(statement).all()
    return [
        {
            "label": course.title,
            "value": course.id,
            # "package_id": course.package.id
        }
        for course in results
    ]
