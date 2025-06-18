"""
Initialize the modules package and import models for database creation.

This file ensures that all SQLModel models (e.g., User) are imported when
`from app.modules import *` is used in `app/database.py` for creating database tables.
"""
### core imports
### module imports
from .auth.models import RefreshToken
from .users.models import User
from .courses.models import Course
from .packages.models import Package
from .students.models import Student
from .registers.models import Register
from .payments.models import Payment
