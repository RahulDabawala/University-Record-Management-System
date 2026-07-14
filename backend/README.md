# Backend Setup

## Create a virtual environment

python -m venv .venv

## Activate

Windows

.venv\Scripts\activate

## Install dependencies

pip install -r requirements.txt

## Create the database

Run:

backend/database/schema.sql

using MySQL Workbench.

Then run:

backend/database/dummy_data.sql

## Start the API

uvicorn src.main:app --reload