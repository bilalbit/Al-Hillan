from fastapi import HTTPException, status
from sqlmodel import Session, select, func

from .models import *
from api.app.core.models import filter_query
from api.app.modules.courses.models import Course


def db_get_course_package(course_id: uuid.UUID, session: Session):
    db_course = session.get(Course, course_id)
    print(db_course)
    if not db_course or not db_course.is_available or db_course.package is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Course not found")
    return db_course.package


def db_get_all_package(query, session: Session):
    # Base query with join to get Course title
    base_query = select(Package, Course.title).join(Course, Package.course_type == Course.id)

    # Calculate the total count of all packages (without pagination)
    total_count_query = select(func.count()).select_from(Package)
    total_count = session.exec(total_count_query).one()

    # Apply pagination and ordering to the query
    statement = base_query.offset(query.offset).limit(query.limit)

    # Apply ordering based on query.order_by
    if query.order_by == "updated_at":
        statement = statement.order_by(Package.updated_at)
    else:
        statement = statement.order_by(Package.created_at)  # Default to created_at

    # Execute the paginated query
    results = session.exec(statement).all()

    # Map results to PackagePublic
    db_packages = [
        PackagePublic(
            id=package.id,
            course_type=package.course_type,
            month_price=package.month_price,
            half_year_price=package.half_year_price,
            year_price=package.year_price,
            course_title=course_title
        )
        for package, course_title in results
    ]

    return {
        "total": total_count,
        "data": db_packages
    }


def db_add_package(package: PackageCreate, session: Session):
    db_package = Package.model_validate(package)
    session.add(db_package)
    session.commit()
    session.refresh(db_package)
    return db_package


def db_edit_package(id: uuid.UUID, package_data: PackageUpdate, session: Session):
    db_package = session.get(Package, id)
    if db_package is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Package not found")
    db_package_data = package_data.model_dump(exclude_unset=True)
    db_package.sqlmodel_update(db_package_data)
    session.add(db_package)
    session.commit()
    session.refresh(db_package)
    return db_package
