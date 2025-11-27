from pydantic import BaseModel

class NoteIn(BaseModel):
    note_title: str
    note_content: str

class NoteOut(BaseModel):
    note_id: str
    user_id: str
    note_title: str
    note_content: str
    created_on: str   
    last_update: str     