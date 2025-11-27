from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth_router import router as auth_router
from app.routers.notes_router import router as notes_router

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- ROUTERS ----------------
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(notes_router, prefix="/notes", tags=["Notes"])

@app.get("/")
async def root():
    return {"status": "FastAPI Notes API Running"}


















# from fastapi import FastAPI, Depends, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.security import OAuth2PasswordRequestForm, HTTPBearer, HTTPAuthorizationCredentials

# from . import crud
# import app.auth as auth

# from .models import UserIn, NoteIn
# from .schemas import Token, UserPublic, NoteOut


# app = FastAPI()

# # Allow frontend access (adjust origins in production)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# security = HTTPBearer()


# # ---------------- AUTH HELPERS ----------------
# async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     """
#     Dependency to get current user from Bearer token.
#     Note: crud.get_user_by_id is async so we await it.
#     """
#     token = credentials.credentials
#     data = auth.decode_token(token)
#     user = await crud.get_user_by_id(data.get("user_id"))
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid authentication credentials")
#     return user


# # ---------------- AUTH ----------------

# @app.post("/auth/signup", response_model=UserPublic)
# async def signup(user: UserIn):
#     exists = await crud.get_user_by_email(user.user_email)
#     if exists:
#         raise HTTPException(status_code=400, detail="Email already registered")

#     hashed = auth.hash_password(user.password)

#     user_doc = {
#         "user_id": __import__("uuid").uuid4().hex,
#         "user_name": user.user_name,
#         "user_email": user.user_email,
#         "password_hash": hashed,
#     }

#     new_user = await crud.create_user(user_doc)
#     return UserPublic(**new_user)


# @app.post("/auth/login", response_model=Token)
# async def login(form: OAuth2PasswordRequestForm = Depends()):
#     """
#     Login using OAuth2PasswordRequestForm (x-www-form-urlencoded).
#     Postman: use x-www-form-urlencoded with keys `username` and `password`.
#     """
#     user = await crud.get_user_by_email(form.username)
#     if not user:
#         raise HTTPException(status_code=400, detail="Wrong credentials")

#     if not auth.verify_password(form.password, user["password_hash"]):
#         raise HTTPException(status_code=400, detail="Wrong credentials")

#     token = auth.create_token({"user_id": user["user_id"]})
#     return {"access_token": token, "token_type": "bearer"}


# # ---------------- NOTES ----------------

# @app.post("/notes", response_model=NoteOut)
# async def create_note_api(note: NoteIn, user = Depends(get_current_user)):
#     doc = {
#         "note_id": __import__("uuid").uuid4().hex,
#         "user_id": user["user_id"],
#         "note_title": note.note_title,
#         "note_content": note.note_content,
#     }
#     result = await crud.create_note(doc)
#     return result


# @app.get("/notes", response_model=list[NoteOut])
# async def get_notes_api(user = Depends(get_current_user)):
#     notes = await crud.get_notes(user["user_id"])
#     return notes


# @app.get("/notes/{note_id}", response_model=NoteOut)
# async def get_note_api(note_id: str, user = Depends(get_current_user)):
#     note = await crud.get_note_by_id(note_id)
#     if not note or note["user_id"] != user["user_id"]:
#         raise HTTPException(status_code=404, detail="Note not found")
#     return note


# @app.put("/notes/{note_id}", response_model=NoteOut)
# async def update_note_api(note_id: str, note: NoteIn, user = Depends(get_current_user)):
#     existing = await crud.get_note_by_id(note_id)
#     if not existing or existing["user_id"] != user["user_id"]:
#         raise HTTPException(status_code=404, detail="Note not found")

#     updated = await crud.update_note(note_id, {
#         "note_title": note.note_title,
#         "note_content": note.note_content
#     })

#     return updated


# @app.delete("/notes/{note_id}")
# async def delete_note_api(note_id: str, user = Depends(get_current_user)):
#     existing = await crud.get_note_by_id(note_id)
#     if not existing or existing["user_id"] != user["user_id"]:
#         raise HTTPException(status_code=404, detail="Note not found")
#     await crud.delete_note(note_id)
#     return {"deleted": True}
