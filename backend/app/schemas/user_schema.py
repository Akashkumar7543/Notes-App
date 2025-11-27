from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class UserPublic(BaseModel):
    user_id: str
    user_name: str
    user_email: str

class UserIn(BaseModel):
    user_name: str
    user_email: str
    password: str
