from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class PasswordRequest(BaseModel):
    password: str



@router.post("/analyze")
def analyze_password(data: PasswordRequest):

    password = data.password

    score = 0
    issues = []
    suggestions = []


    # Length Check
    if len(password) >= 8:
        score += 25
    else:
        issues.append("Password length is too short")
        suggestions.append("Use minimum 8 characters")


    # Uppercase
    if any(char.isupper() for char in password):
        score += 20
    else:
        issues.append("Missing uppercase letters")
        suggestions.append("Add uppercase characters")


    # Lowercase
    if any(char.islower() for char in password):
        score += 20
    else:
        issues.append("Missing lowercase letters")
        suggestions.append("Add lowercase characters")


    # Numbers
    if any(char.isdigit() for char in password):
        score += 15
    else:
        issues.append("Missing numbers")
        suggestions.append("Add numbers")


    # Symbols
    special = "!@#$%^&*()_+-="
    
    if any(char in special for char in password):
        score += 20
    else:
        issues.append("Missing special characters")
        suggestions.append("Add symbols like @#$%")


    if score >= 80:
        level="Strong"

    elif score >=50:
        level="Medium"

    else:
        level="Weak"



    return {

        "score":score,

        "level":level,

        "issues":issues,

        "suggestions":suggestions

    }