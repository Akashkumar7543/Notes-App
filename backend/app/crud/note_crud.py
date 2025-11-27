from datetime import datetime
from app.db.connection import db

NOTES = db["notes"]

async def create_note(note: dict):
    now = datetime.utcnow()
    note["created_on"] = now
    note["last_update"] = now
    await NOTES.insert_one(note)
    return note

async def update_note(note_id: str, data: dict):
    data["last_update"] = datetime.utcnow()
    await NOTES.update_one({"note_id": note_id}, {"$set": data})
    return await NOTES.find_one({"note_id": note_id})

async def get_notes(user_id: str):
    cursor = NOTES.find({"user_id": user_id})
    return await cursor.to_list(length=1000)

async def get_note_by_id(note_id: str):
    return await NOTES.find_one({"note_id": note_id})

async def delete_note(note_id: str):
    await NOTES.delete_one({"note_id": note_id})
    return True
