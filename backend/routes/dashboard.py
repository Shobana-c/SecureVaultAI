from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.password import Password
from security.encryption import decrypt_password


router = APIRouter()


@router.get("/stats/{user_id}")
def dashboard(
    user_id:int,
    db:Session = Depends(get_db)
):

    passwords = db.query(Password).filter(
        Password.user_id == user_id
    ).all()


    total = len(passwords)

    strong = 0
    medium = 0
    weak = 0


    for item in passwords:

        try:
            pwd = decrypt_password(
                item.encrypted_password
            )

            length = len(pwd)


            if length >= 12:
                strong += 1

            elif length >= 8:
                medium += 1

            else:
                weak += 1


        except:
            weak += 1



    return {

        "total_passwords": total,
        "strong": strong,
        "medium": medium,
        "weak": weak

    }