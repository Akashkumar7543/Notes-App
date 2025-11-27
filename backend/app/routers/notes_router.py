from fastapi import APIRouter, Depends, HTTPException
import uuid
from datetime import datetime

from app.schemas.note_schema import NoteIn, NoteOut
from app.dependencies.auth_dep import get_current_user
from app.crud.note_crud import (
    create_note,
    get_notes,
    get_note_by_id,
    update_note,
    delete_note,
)

router = APIRouter()

def serialize_note(note: dict) -> dict:
    """Convert datetime fields to ISO strings for frontend"""
    note_copy = note.copy()
    for field in ["created_on", "last_update"]:
        if field in note_copy and isinstance(note_copy[field], datetime):
            note_copy[field] = note_copy[field].isoformat()
    return note_copy

@router.post("/", response_model=NoteOut)
async def create_note_api(note: NoteIn, user=Depends(get_current_user)):
    doc = {
        "note_id": uuid.uuid4().hex,
        "user_id": user["user_id"],
        "note_title": note.note_title,
        "note_content": note.note_content,
    }
    created_note = await create_note(doc)
    return serialize_note(created_note)  # ✅ always includes dates

@router.get("/", response_model=list[NoteOut])
async def get_notes_api(user=Depends(get_current_user)):
    notes = await get_notes(user["user_id"])
    return [serialize_note(note) for note in notes]


@router.get("/{note_id}", response_model=NoteOut)
async def get_note_api(note_id: str, user=Depends(get_current_user)):
    note = await get_note_by_id(note_id)
    if not note or note["user_id"] != user["user_id"]:
        raise HTTPException(status_code=404, detail="Note not found")
    return serialize_note(note)

@router.put("/{note_id}", response_model=NoteOut)
async def update_note_api(note_id: str, note: NoteIn, user=Depends(get_current_user)):
    existing = await get_note_by_id(note_id)
    if not existing or existing["user_id"] != user["user_id"]:
        raise HTTPException(status_code=404, detail="Note not found")
    updated_note = await update_note(
        note_id,
        {
            "note_title": note.note_title,
            "note_content": note.note_content,
        },
    )
    return serialize_note(updated_note)

@router.delete("/{note_id}")
async def delete_note_api(note_id: str, user=Depends(get_current_user)):
    existing = await get_note_by_id(note_id)
    if not existing or existing["user_id"] != user["user_id"]:
        raise HTTPException(status_code=404, detail="Note not found")
    await delete_note(note_id)
    return {"deleted": True}
