from datetime import timedelta

from fastapi import HTTPException, status
from sqlmodel import Session, select, func

from api.app.modules.packages.models import Package
from .models import *


# def db_get_all_payment(payment_date: date, session: Session):
#     statement = select(Payment).where(Payment.payment_date <= payment_date,
#                                       Payment.payment_date >= (payment_date - timedelta(days=30)))
#     db_student = session.exec(statement).all()
#     total_count_query = select(func.count()).select_from(Payment)
#     total_count = session.exec(total_count_query).one()
#     return {
#         "total_count": total_count,
#         "month_total_count": len(db_student),
#         "data": db_student
#     }


def db_get_all_payment(payment_date: date, session: Session):
    """
    Retrieve all payments with student first_name, middle_name, last_name, phone_number,
    and payment account_number for payments within the last 30 days up to the specified date.

    Args:
        payment_date (date): The end date for the 30-day period.
        session (Session): SQLModel database session.

    Returns:
        Dict[str, Any]: Dictionary containing total count of all payments,
                        count of payments in the period, and payment details.
    """
    # Calculate the start date (30 days before payment_date)
    start_date = payment_date - timedelta(days=30)

    # Query to get payments with student details
    statement = (
        select(
            Payment.id,
            Student.id.label("student_id"),
            Student.first_name,
            Student.middle_name,
            Student.last_name,
            Student.phone_number,
            Payment.account_number,
            Payment.payment_method,
            Payment.transaction,
            Payment.amount,
            Payment.status,
            Payment.payment_date,
        )
        .join(Student, Payment.student_id == Student.id, isouter=True)  # Outer join to handle nullable student_id
        .where(
            Payment.payment_date <= payment_date,
            Payment.payment_date >= start_date
        )
    )

    # Execute the query
    db_results = session.exec(statement).all()

    # Query to get total count of all payments
    total_count_query = select(func.count()).select_from(Payment)
    total_count = session.exec(total_count_query).one()

    # Format the results
    data = [
        {
            "payment_id": result.id,
            "student_id": result.student_id,
            "first_name": result.first_name,
            "middle_name": result.middle_name,
            "last_name": result.last_name,
            "phone_number": result.phone_number,
            "account_number": result.account_number,
            "payment_method": result.payment_method,
            "tin_number": result.transaction,
            "amount": result.amount,
            "status": result.status,
            "payment_date": result.payment_date,
        }
        for result in db_results
    ]

    return {
        "total_count": total_count,
        "month_total_count": len(db_results),
        "data": data
    }

def db_add_payment(phone_number: str, payment_data: PaymentCreate, session: Session):
    if (payment_data.payment_method == PaymentMethod.cbe and payment_data.account_number == None):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="account number is required")
    db_student = session.exec(
        select(Student).where(Student.phone_number == phone_number)
    ).first()
    if not db_student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    db_package = session.get(Package, payment_data.package_id)
    if not db_package:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Package not found")
    amount = 0
    if payment_data.plan == PlanType.monthly:
        amount = db_package.month_price
    elif payment_data.plan == PlanType.half_year:
        amount = db_package.half_year_price
    else:
        amount = db_package.year_price
    db_payment = Payment.model_validate(
        payment_data,
        update={
            "student_id": db_student.id,
            "amount": amount
        }
    )
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment
def db_update_payment(id: uuid.UUID,payment_status: PaymentStatus, session: Session):
    db_payment = session.get(Payment,id)
    if not db_payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Payment not found")
    db_payment.status = payment_status
    session.add(db_payment)
    session.commit()
    session.refresh(db_payment)
    return db_payment


def db_verify_payment_status(transaction: str, session: Session):
    db_payment = session.exec(
        select(Payment).where(
            Payment.transaction == transaction
        )
    ).first()
    if not db_payment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Payment not found")
    return db_payment