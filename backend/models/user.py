from sqlalchemy import Column, Integer, String, Boolean
from database.database import Base


class User(Base):

    __tablename__ = "users"


    # Primary Key
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    # User Details
    fullname = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        index=True,
        nullable=False
    )


    # Password Hash
    password = Column(
        String(255),
        nullable=False
    )


    # =========================
    # Two Factor Authentication
    # =========================


    # Secret key generated for TOTP
    # Used by Google Authenticator/Authy
    twofa_secret = Column(
        String(255),
        nullable=True
    )


    # Checks whether user enabled 2FA
    is_2fa_enabled = Column(
        Boolean,
        default=False
    )