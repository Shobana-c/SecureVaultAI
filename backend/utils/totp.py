import pyotp
import qrcode
import io
import base64


def generate_secret():
    return pyotp.random_base32()


def generate_qr(email, secret):
    uri = pyotp.TOTP(secret).provisioning_uri(
        name=email,
        issuer_name="SecureVault AI"
    )

    qr = qrcode.make(uri)

    buffer = io.BytesIO()
    qr.save(buffer, format="PNG")

    return base64.b64encode(buffer.getvalue()).decode()


def verify_totp(secret, otp):
    totp = pyotp.TOTP(secret)
    return totp.verify(otp)