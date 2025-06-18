from fastapi import HTTPException, status
from sqlmodel import Session

from api.app.modules.auth.utils import hash_password
from .models import *


def db_get_user_info(user_id: uuid.UUID, db_session: Session = Session):
    db_user = db_session.get(User, user_id)
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return db_user


def db_update_profile(user_data: UsersUpdate, user_id: uuid.UUID, db_session: Session):
    db_user = db_get_user_info(user_id, db_session)
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    extra_data = {}
    if user_data.password:
        extra_data = {"hashed_password": (hash_password(user_data.password))}

    updated_user = user_data.model_dump(exclude_unset=True)
    db_user.sqlmodel_update(updated_user, update=extra_data)
    db_session.add(db_user)
    db_session.commit()
    db_session.refresh(db_user)
    return db_user


def db_delete_account(user_id: uuid.UUID, db_session: Session):
    db_user = db_get_user_info(user_id, db_session)
    db_session.delete(db_user)
    db_session.commit()
