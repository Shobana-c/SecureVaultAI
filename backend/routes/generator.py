from fastapi import APIRouter
import random
import string

router = APIRouter()


@router.get("/generate")
def generate_password(length: int = 16):

    if length < 8:
        length = 8

    if length > 64:
        length = 64

    characters = (
        string.ascii_letters +
        string.digits +
        string.punctuation
    )

    password = "".join(
        random.choice(characters)
        for _ in range(length)
    )

    return {
        "generated_password": password,
        "length": length
    }