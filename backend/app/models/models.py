from pydantic import BaseModel, EmailStr, Field
from uuid import uuid4
from datetime import datetime

def gen_uuid():
    return str(uuid4())

class UserIn(BaseModel):
    user_name: str
    user_email: EmailStr
    password: str

class UserDB(BaseModel):
    user_id: str = Field(default_factory=gen_uuid)
    user_name: str
    user_email: EmailStr
    password_hash: str
    created_on: datetime = Field(default_factory=datetime.utcnow)
    last_update: datetime = Field(default_factory=datetime.utcnow)

class NoteIn(BaseModel):
    note_title: str
    note_content: str

class NoteDB(BaseModel):
    note_id: str = Field(default_factory=gen_uuid)
    user_id: str
    note_title: str
    note_content: str
    created_on: datetime = Field(default_factory=datetime.utcnow)
    last_update: datetime = Field(default_factory=datetime.utcnow)
