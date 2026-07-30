from pydantic import BaseModel


class PasswordCreate(BaseModel):
    website: str
    username: str
    password: str
    category: str
    notes: str
    user_id: int


class PasswordResponse(BaseModel):
    id: int
    website: str
    username: str
    category: str
    notes: str

    class Config:
        from_attributes = True