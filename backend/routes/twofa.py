from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import pyotp
import qrcode
import io
import base64


from database.database import get_db
from models.user import User


router = APIRouter()



# ============================
# Generate 2FA Secret + QR Code
# ============================

@router.post("/setup/{user_id}")
def setup_2fa(
    user_id: int,
    db: Session = Depends(get_db)
):

    # Find user
    user = db.query(User).filter(
        User.id == user_id
    ).first()


    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    # Generate secret key
    secret = pyotp.random_base32()


    # Save secret temporarily
    user.twofa_secret = secret

    db.commit()


    # Create OTP URL
    otp_uri = pyotp.totp.TOTP(
        secret
    ).provisioning_uri(
        name=user.email,
        issuer_name="SecureVault AI"
    )


    # Generate QR Code
    qr = qrcode.make(
        otp_uri
    )


    # Convert QR image to base64
    buffer = io.BytesIO()

    qr.save(
        buffer,
        format="PNG"
    )


    qr_base64 = base64.b64encode(
        buffer.getvalue()
    ).decode()



    return {
        "message": "Scan QR Code using Google Authenticator",
        "secret": secret,
        "qr_code": qr_base64
    }





# ============================
# Verify OTP and Enable 2FA
# ============================

@router.post("/verify/{user_id}")
def verify_2fa(
    user_id: int,
    otp: str,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()


    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    if not user.twofa_secret:

        raise HTTPException(
            status_code=400,
            detail="2FA setup not started"
        )


    totp = pyotp.TOTP(
        user.twofa_secret
    )


    if totp.verify(otp):

        user.is_2fa_enabled = True

        db.commit()


        return {
            "message": "2FA enabled successfully"
        }


    else:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )





# ============================
# Disable 2FA
# ============================

@router.post("/disable/{user_id}")
def disable_2fa(
    user_id: int,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.id == user_id
    ).first()


    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )


    user.twofa_secret = None

    user.is_2fa_enabled = False


    db.commit()


    return {
        "message": "2FA disabled successfully"
    }