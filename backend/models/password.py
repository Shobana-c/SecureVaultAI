from sqlalchemy import Column, Integer, String, ForeignKey
from database.database import Base
from sqlalchemy import DateTime
from datetime import datetime

created_at = Column(DateTime, default=datetime.utcnow)
updated_at = Column(
    DateTime,
    default=datetime.utcnow,
    onupdate=datetime.utcnow
)


class Password(Base):
    __tablename__ = "passwords"

    id = Column(Integer, primary_key=True, index=True)

    website = Column(String, nullable=False)

    username = Column(String, nullable=False)

    encrypted_password = Column(String, nullable=False)

    category = Column(String)

    notes = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))