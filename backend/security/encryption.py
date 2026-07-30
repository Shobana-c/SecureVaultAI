from cryptography.fernet import Fernet

# Keep this key safe.
# In production, store it in an environment variable.
SECRET_KEY = b'v6cCy2PPsG7hgz3VnLAM_3tr9GW-O7En_oEJUJ4NnnA='

cipher = Fernet(SECRET_KEY)


def encrypt_password(password: str) -> str:
    encrypted = cipher.encrypt(password.encode())
    return encrypted.decode()


def decrypt_password(encrypted_password: str) -> str:
    decrypted = cipher.decrypt(encrypted_password.encode())
    return decrypted.decode()