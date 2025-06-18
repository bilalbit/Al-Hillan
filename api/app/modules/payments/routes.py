from fastapi import APIRouter, Depends

from api.app.database import db_session
from api.app.modules.auth.security import get_current_user
from api.app.core.models import PhoneNumber

from .services import *

router = APIRouter(
    prefix="/payment",
    tags=["payment"],
    dependencies=[Depends(get_current_user)]
)

@router.get('/')
async def get_all_payment(payment_date: date, db: db_session):
    return db_get_all_payment(payment_date, db)
@router.patch('/{id}')
async def update_payment(id:uuid.UUID,payment_status: PaymentStatus, db:db_session):
    return db_update_payment(id,payment_status, db)