from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from security.jwt_handler import verify_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    print("Authorization Header:", credentials)

    token = credentials.credentials.strip('"')

    print("Token:", token)

    payload = verify_token(token)

    print("Payload:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )

    return payload