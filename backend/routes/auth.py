from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.user import User
from schemas.user import UserCreate, UserLogin

from security.hash import hash_password, verify_password
from security.jwt_handler import create_access_token
from security.dependencies import get_current_user

from utils.totp import (
    generate_secret,
    generate_qr,
    verify_totp
)

router = APIRouter()


# ---------------- REGISTER ---------------- #

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    new_user = User(
        fullname=user.fullname,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid Email"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=400,
            detail="Invalid Password"
        )

    token = create_access_token(
        {
            "user_id": db_user.id,
            "email": db_user.email
        }
    )

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "fullname": db_user.fullname,
            "email": db_user.email
        }
    }


# ---------------- GET ALL USERS ---------------- #

@router.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "fullname": user.fullname,
            "email": user.email,
            "password": user.password
        }
        for user in users
    ]


# ---------------- CURRENT USER ---------------- #

@router.get("/me")
def read_user_me(current_user=Depends(get_current_user)):
    return {
        "message": "Authorized User",
        "user": current_user
    }


# ---------------- GENERATE QR ---------------- #

@router.post("/generate-qr")
def generate_totp_qr(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # JWT contains "user_id"
    user_id = current_user["user_id"]

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.twofa_secret is None:
        user.twofa_secret = generate_secret()

        db.commit()
        db.refresh(user)

    qr_code = generate_qr(
        user.email,
        user.twofa_secret
    )

    return {
        "message": "QR Generated Successfully",
        "secret": user.twofa_secret,
        "qr_code": qr_code
    }


# ---------------- VERIFY OTP ---------------- #

@router.post("/verify-otp")
def verify_otp(
    otp: str,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = current_user["user_id"]

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.twofa_secret is None:
        raise HTTPException(
            status_code=400,
            detail="Please generate QR first."
        )

    if not verify_totp(user.twofa_secret, otp):
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    user.is_2fa_enabled = True

    db.commit()

    return {
        "message": "Two-Factor Authentication Enabled Successfully"
    }

print("AUTH ROUTES COUNT:", len(router.routes))

for r in router.routes:
    print("AUTH ROUTE:", r.path)