# University-Record-Management-System
A relational database application for managing university students, lecturers, courses, and staff.

## Technologies

- Python
- MySQL
- Git/GitHub
- React/TypeScript
- Tailwind CSS


## How to start the servers

### 1. Start MySQL

Official installer:
```
sudo /usr/local/mysql/support-files/mysql.server start
```

Homebrew:
```
brew services start mysql
```

### 2. Start the backend

From the backend folder, own terminal:
```
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn src.main:app --reload
```

Check it's up: `http://127.0.0.1:8000/health/database` should return status connected. If not, MySQL isn't reachable or the DB config/credentials are off.

### 3. Start the frontend

From the frontend folder, separate terminal:
```
npm run dev
or
pnpm run dev
```

Served at `http://localhost:5173/` , etc

### 4. One-time setup

CORS middleware in `main.py` (confirm your frontend port exists here):
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], Note: this can be reconfigured to mark your respective port(s)
    allow_methods=["GET"],
    allow_headers=["*"],
)
```

`queries.ts` and `QueryPanel.tsx` updated to the versions calling the real backend endpoints.

Optional `.env` in frontend root if using `VITE_API_BASE_URL`:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

### 5. Every-day startup

```
# terminal 1 - mysql
sudo /usr/local/mysql/support-files/mysql.server start

# terminal 2 - backend
cd backend && source venv/bin/activate && uvicorn src.main:app --reload --port 8000

# terminal 3 - frontend
cd frontend && npm run dev
```

Then open `http://localhost:5173/`

### 6. Stopping MySQL

Official installer:
```
sudo /usr/local/mysql/support-files/mysql.server stop
```

Homebrew:
```
brew services stop mysql
```

Prevent auto-start on login: for the official installer, uncheck the MySQL startup option in System Settings. For Homebrew, `brew services stop` already disables it - confirm with `brew services list`.

Check nothing is left running:
```
ps aux | grep mysqld
```
A line for `grep` itself will always show up - that's not MySQL. Look for an actual `/usr/local/mysql/bin/mysqld` line; if it's not there, it's stopped.

Only if stop doesn't work, force kill (can corrupt data if mid-write, last resort only):
```
sudo pkill -9 mysqld
```