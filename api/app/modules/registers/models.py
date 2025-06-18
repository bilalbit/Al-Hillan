import uuid
from datetime import date

from sqlmodel import Field, SQLModel, Relationship

from api.app.modules.students.models import Student, StudentCreate


class RegisterBase(SQLModel):
    course_id: uuid.UUID = Field(foreign_key="course.id")


class Register(RegisterBase, table=True):
    student_id: uuid.UUID | None = Field(default=None, foreign_key="student.id")
    id: uuid.UUID | None = Field(primary_key=True, index=True, default_factory=uuid.uuid4)

    registration_date: date | None = Field(
        default_factory=lambda: date.today(),
        nullable=False,
        index=True,
    )
    student: "Student" = Relationship(back_populates="register")


class RegisterNewStudentCreate(RegisterBase, StudentCreate):
    pass


class RegisterCreate(RegisterBase):
    pass


class RegisterPublic(RegisterBase):
    id: uuid.UUID
