from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
import uuid

from app.schemas.user_schema import UserIn, UserPublic, Token
from app.crud.user_crud import get_user_by_email, create_user
from app.core.security import hash_password, verify_password, create_token
from app.dependencies.auth_dep import get_current_user


router = APIRouter()

@router.post("/signup", response_model=UserPublic)
async def signup(user: UserIn):
    exists = await get_user_by_email(user.user_email)
    if exists:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(user.password)

    user_doc = {
        "user_id": uuid.uuid4().hex,
        "user_name": user.user_name,
        "user_email": user.user_email,
        "password_hash": hashed,
    }

    new_user = await create_user(user_doc)
    return UserPublic(**new_user)


@router.post("/login", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user = await get_user_by_email(form.username)

    if not user:
        raise HTTPException(status_code=400, detail="Wrong credentials")

    if not verify_password(form.password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Wrong credentials")

    token = create_token({"user_id": user["user_id"]})
    return {"access_token": token, "token_type": "bearer"}

    
@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    return {
        "user_id": user["user_id"],
        "user_name": user["user_name"],
        "user_email": user["user_email"]
    }
