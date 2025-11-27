from datetime import datetime
from app.db.connection import db

USERS = db["users"]


async def get_user_by_email(email: str):
    return await USERS.find_one({"user_email": email})


async def create_user(user: dict):
    user["created_on"] = datetime.utcnow()
    user["last_update"] = datetime.utcnow()
    await USERS.insert_one(user)
    return user


async def get_user_by_id(user_id: str):
    return await USERS.find_one({"user_id": user_id})
