from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.core.security import decode_token
from app.crud.user_crud import get_user_by_id

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    data = decode_token(token)

    user = await get_user_by_id(data.get("user_id"))
    if not user:
        raise HTTPException(status_code=401, detail="Invalid authentication")

    return user
