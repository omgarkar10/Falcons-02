from __future__ import annotations

import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection

load_dotenv()

# Use the provided connection string
DATABASE_URI = os.environ.get("MONGODB_URI")

client: MongoClient | None = None
db: Database | None = None

def get_db() -> Database:
    global db
    if db is None:
        raise Exception("Database not initialized")
    return db

def get_collection(name: str) -> Collection:
    return get_db()[name]

def init_app(app):
    """Initialize PyMongo with the Flask app."""
    global client, db
    client = MongoClient(DATABASE_URI)
    db = client.get_database("falcons_db")  # Specific databse name
    app.config["MONGO_URI"] = DATABASE_URI

def init_db(with_sample_data: bool = False):
    """(Optional) Create indexes or sample data here."""
    pass
