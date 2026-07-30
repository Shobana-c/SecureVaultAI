from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.password import Password
from schemas.password import PasswordCreate
from security.encryption import encrypt_password, decrypt_password

router = APIRouter()


# ---------------- ADD PASSWORD ---------------- #

@router.post("/add")
def add_password(password: PasswordCreate, db: Session = Depends(get_db)):

    new_password = Password(
        website=password.website,
        username=password.username,
        encrypted_password=encrypt_password(password.password),
        category=password.category,
        notes=password.notes,
        user_id=password.user_id
    )

    db.add(new_password)
    db.commit()
    db.refresh(new_password)

    return {
        "message": "Password Saved Successfully",
        "data": {
            "id": new_password.id,
            "website": new_password.website,
            "username": new_password.username
        }
    }


# ---------------- GET USER PASSWORDS ---------------- #

@router.get("/user/{user_id}")
def get_passwords(user_id: int, db: Session = Depends(get_db)):

    passwords = db.query(Password).filter(
        Password.user_id == user_id
    ).all()

    return [
        {
            "id": item.id,
            "website": item.website,
            "username": item.username,
            "password": decrypt_password(item.encrypted_password),
            "category": item.category,
            "notes": item.notes
        }
        for item in passwords
    ]


# ---------------- UPDATE PASSWORD ---------------- #

@router.put("/update/{password_id}")
def update_password(
    password_id: int,
    password: PasswordCreate,
    db: Session = Depends(get_db)
):

    db_password = db.query(Password).filter(
        Password.id == password_id
    ).first()

    if not db_password:
        raise HTTPException(
            status_code=404,
            detail="Password not found"
        )

    db_password.website = password.website
    db_password.username = password.username
    db_password.encrypted_password = encrypt_password(password.password)
    db_password.category = password.category
    db_password.notes = password.notes
    db_password.user_id = password.user_id

    db.commit()
    db.refresh(db_password)

    return {
        "message": "Password Updated Successfully",
        "data": {
            "id": db_password.id,
            "website": db_password.website,
            "username": db_password.username
        }
    }


# ---------------- DELETE PASSWORD ---------------- #

@router.delete("/delete/{password_id}")
def delete_password(
    password_id: int,
    db: Session = Depends(get_db)
):

    db_password = db.query(Password).filter(
        Password.id == password_id
    ).first()

    if not db_password:
        raise HTTPException(
            status_code=404,
            detail="Password not found"
        )

    db.delete(db_password)
    db.commit()

    return {
        "message": "Password Deleted Successfully"
    }


# ---------------- SEARCH PASSWORDS ---------------- #

@router.get("/search")
def search_passwords(
    website: str = None,
    category: str = None,
    db: Session = Depends(get_db)
):

    query = db.query(Password)

    if website:
        query = query.filter(
            Password.website.contains(website)
        )

    if category:
        query = query.filter(
            Password.category.contains(category)
        )

    passwords = query.all()

    return [
        {
            "id": item.id,
            "website": item.website,
            "username": item.username,
            "password": decrypt_password(item.encrypted_password),
            "category": item.category,
            "notes": item.notes,
            "user_id": item.user_id
        }
        for item in passwords
    ]