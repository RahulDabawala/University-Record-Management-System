# University Record Management System

A full-stack University Record Management System developed as part of the MSc Computer Science programme.

The application uses a MySQL relational database, a FastAPI backend and a React frontend to provide an interface for querying university records, including students, lecturers, courses, departments, publications, staff and research projects.

---

# Features

- MySQL relational database
- FastAPI REST API
- React + TypeScript frontend
- Interactive Swagger API documentation
- 10 backend database queries
- Sample university dataset for testing
- Unit tested backend components

---

# Technologies

- Python
- FastAPI
- MySQL
- React
- TypeScript
- Vite
- Git/GitHub
- Tailwind CSS

---

# Project Structure

```text
University-Record-Management-System
│
├── backend
│   ├── database
│   │   ├── schema.sql
│   │   └── dummy_data.sql
│   │
│   ├── src
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── queries.py
│   │
│   ├── tests
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
└── README.md
```

---

# Application Workflow

1. The user submits a query through the React frontend.
2. The frontend sends an HTTP request to the FastAPI backend.
3. FastAPI validates the request and obtains a MySQL database connection.
4. A parameterised SQL query is executed using `mysql.connector`.
5. The query results are returned as JSON.
6. The frontend displays the returned data in a table.

---

# Prerequisites

Install the following before running the project.

- Python 3.11 or newer
- Node.js 20 or newer
- npm
- MySQL Server 8.0+
- MySQL Workbench (recommended)

---

# Database Setup

Create the database by executing the SQL scripts in the following order.

```text
backend/database/schema.sql
backend/database/dummy_data.sql
```

The schema creates all database tables and relationships, while the dummy data populates the database with sample records used to demonstrate the application.

---

# Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create and activate a virtual environment.

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install the required Python packages.

```bash
pip install -r requirements.txt
```

---

# Backend Configuration

Create a `.env` file inside the backend directory.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=university_records
```

---

# Starting MySQL

### Windows

Start the **MySQL80** service or launch MySQL through MySQL Workbench.

### macOS

Official installer:

```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

Homebrew:

```bash
brew services start mysql
```

### Linux

```bash
sudo systemctl start mysql
```

---

# Running the Backend

From the backend directory:

```bash
python -m uvicorn src.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Swagger documentation is available at:

```text
http://127.0.0.1:8000/docs
```

Verify the backend is connected to the database by visiting:

```text
http://127.0.0.1:8000/health/database
```

A successful response should return:

```json
{
    "status": "connected",
    "database_version": "8.x.x"
}
```

If the endpoint cannot be reached, ensure MySQL is running and the database credentials in the backend `.env` file are correct.

---

# Frontend Setup

Navigate to the frontend directory.

```bash
cd frontend
```

Install the required packages.

```bash
npm install
```

By default, the frontend communicates with the backend at:

```text
http://127.0.0.1:8000
```

If the backend is running on a different host or port, create a `.env` file in the frontend directory containing:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

The backend is configured to accept requests from:

```text
http://localhost:5173
```

If the frontend is served from a different port, update the CORS configuration in `backend/src/main.py` accordingly.

---

# Running the Frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

The frontend communicates directly with the FastAPI backend using REST API endpoints. Each query executes a parameterised SQL query against the MySQL database, and the returned results are displayed within the user interface.

---

# Running Tests

**Note:** Run these commands from the `backend/` directory (with the virtual environment activated).

```bash
`python -m pytest -v`
```

To check code quality and PEP 8 compliance:

```bash
ruff check .
```

---

# API Endpoints

The backend exposes REST endpoints for querying university data, including:

- Students enrolled on a course taught by a lecturer
- High-achieving final-year students
- Unregistered students
- Faculty advisor details
- Lecturers by research interests
- Courses by department
- Lecturer publication reports
- Students advised by a lecturer
- Department staff lookup
- Research project supervisors

Complete endpoint documentation is available through the Swagger interface.

---

# Query Input Reference

Several queries require user-supplied lookup values. These values should exactly match the sample data stored in the database.

## Available Course Codes

- CS101
- CS201
- CS301
- CS401
- CS501
- MATH101
- MATH201
- PHY101
- PHY201
- BUS101
- BUS201
- ENG101
- ENG201
- HUM101

## Available Lecturer Names

- Dr. Patricia Voss
- Prof. James Osei
- Dr. Ananya Krishnan
- Prof. Bruno Castillo
- Dr. Sarah Thornton
- Prof. Yuki Tanaka
- Dr. Hassan El-Amin

## Available Departments

- Computer Science
- Mathematics
- Business
- Physics
- Engineering
- Arts & Humanities
- Academic Affairs
- IT Services
- Finance
- Research Office
- Human Resources

## Available Research Interests

- Distributed Databases
- Machine Learning
- Numerical Methods
- Graph Theory
- Deep Learning
- NLP
- Organisational Behaviour
- Quantum Computing
- Photonics
- Post-Colonial Literature
- Autonomous Systems
- IoT

## Available Semesters

- 2025/26

## Available Publication Years

- 2024
- 2025

## Example Inputs

| Query | Example Input |
|-------|---------------|
| Students by course and lecturer | Course: **CS301**<br>Lecturer: **Dr. Patricia Voss** |
| High-achieving final-year students | No input required |
| Unregistered students | Semester: **2025/26** |
| Faculty advisor details | Student ID: **1** |
| Lecturers by research interest | Research interest: **Machine Learning** |
| Courses by department | Department: **Computer Science** |
| Lecturer publications | Minimum year: **2024** *(leave blank to use the previous calendar year)* |
| Students by advisor | Advisor: **Dr. Patricia Voss** |
| Department staff | Department: **Finance** |
| Research project supervisors | No input required |

> **Note:** Most lookup queries perform exact matching against the values stored in the database. Please enter values exactly as shown above, including titles such as **Dr.** and **Prof.**, to ensure matching results are returned.

---

# Daily Startup

### Terminal 1 - Start MySQL

Windows

- Start the **MySQL80** service or launch MySQL Workbench.

macOS

```bash
sudo /usr/local/mysql/support-files/mysql.server start
```

or

```bash
brew services start mysql
```

Linux

```bash
sudo systemctl start mysql
```

### Terminal 2 - Backend

```bash
cd backend
python -m uvicorn src.main:app --reload
```

### Terminal 3 - Frontend

```bash
cd frontend
npm run dev
```

Open the application:

```text
http://localhost:5173
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

---

# Stopping MySQL (Optional)

When you have finished using the application, you may stop the MySQL server.

### Windows

Stop the **MySQL80** service using the **Services** application or **MySQL Installer**.

### macOS

Official installer:

```bash
sudo /usr/local/mysql/support-files/mysql.server stop
```

Homebrew:

```bash
brew services stop mysql
```

### Linux

```bash
sudo systemctl stop mysql
```

---

# Contributors

- Rahul Dabawala
- Niya Shameer
- Salim Basheib
- Pallavi Kamalapurkar Ram Prasad
- Ysmeen Bucklain
