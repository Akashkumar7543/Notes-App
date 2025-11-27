from motor.motor_asyncio import AsyncIOMotorClient
from urllib.parse import quote_plus
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_USER = quote_plus(os.getenv("MONGO_USER"))
MONGO_PASSWORD = quote_plus(os.getenv("MONGO_PASSWORD"))
MONGO_DB = os.getenv("MONGO_DB")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER")

MONGO_URI = (
    f"mongodb+srv://{MONGO_USER}:{MONGO_PASSWORD}"
    f"@{MONGO_CLUSTER}/{MONGO_DB}?retryWrites=true&w=majority"
)

client = AsyncIOMotorClient(MONGO_URI, tlsAllowInvalidCertificates=True)
db = client[MONGO_DB]
