"""Application configuration for the University Record Management System."""

from __future__ import annotations

import os

from dotenv import load_dotenv

# Load environment variables from the .env file.
load_dotenv()


DATABASE_CONFIG: dict[str, str | int] = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", "3306")),
    "user": os.getenv("DB_USER", ""),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", ""),
}
