"""FastAPI application for the University Record Management System."""

from typing import Annotated

from fastapi import Depends, FastAPI
from mysql.connector import MySQLConnection
from mysql.connector.errors import Error

from src.database import provide_database_connection
from src.queries import (
    get_courses_by_department,
    get_high_achieving_students,
    get_lecturers_by_research_area,
    get_recent_lecturer_publications,
    get_staff_by_department,
    get_student_advisor,
    get_students_by_advisor,
    get_students_by_course_and_lecturer,
    get_top_research_supervisors,
    get_unregistered_students,
)

# Reusable database connection dependency for FastAPI endpoints.
DatabaseConnection = Annotated[
    MySQLConnection,
    Depends(provide_database_connection),
]

app = FastAPI(
    title="University Record Management API",
    description=("Provides access to university records stored in the MySQL database."),
    version="1.0.0",
)


@app.get("/")
def read_root() -> dict[str, str]:
    """Return a message confirming that the API is running."""
    return {
        "message": "University Record Management API is running",
    }


@app.get("/health/database")
def check_database_connection(
    connection: DatabaseConnection,
) -> dict[str, str]:
    """Check whether the API can communicate with MySQL.

    Args:
        connection: A database connection supplied by FastAPI.

    Returns:
        The connection status and MySQL server version.

    Raises:
        Error: If MySQL returns no version information.
    """
    cursor = connection.cursor()

    try:
        cursor.execute("SELECT VERSION();")
        result = cursor.fetchone()

        if result is None:
            raise Error("The database returned no version information.")

        return {
            "status": "connected",
            "database_version": str(result[0]),
        }
    finally:
        cursor.close()


@app.get("/students/by-course")
def read_students(
    course: str,
    lecturer: str,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return students enrolled in a course taught by a lecturer.

    Args:
        course: The course code used to filter enrolments.
        lecturer: The lecturer name used to filter assignments.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of matching student records.
    """
    return get_students_by_course_and_lecturer(
        connection,
        course,
        lecturer,
    )


@app.get("/high-achievers")
def read_high_achieving_students(
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return final-year students with an average grade above 70%.

    Args:
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of high-achieving final-year students.
    """
    return get_high_achieving_students(connection)


@app.get("/unregistered-students")
def read_unregistered_students(
    semester: str,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return students not enrolled in any course for a semester.

    Args:
        semester: The semester used to check enrolments.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of students with no enrolments in the given semester.
    """
    return get_unregistered_students(
        connection,
        semester,
    )


@app.get("/students/advisor")
def read_student_advisor(
    student_id: int,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return the faculty advisor for a specific student.

    Args:
        student_id: The ID of the student whose advisor is required.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list containing the student and advisor details.
    """
    return get_student_advisor(
        connection,
        student_id,
    )


@app.get("/lecturers/research")
def read_lecturers_by_research_area(
    research_area: str,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return lecturers with expertise in a research area.

    Args:
        research_area: The research area used to search lecturers.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of lecturers whose research interests match the search term.
    """
    return get_lecturers_by_research_area(
        connection,
        research_area,
    )


@app.get("/courses/department")
def read_courses_by_department(
    department: str,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return courses taught by lecturers in a department.

    Args:
        department: The department used to filter courses.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of matching courses.
    """
    return get_courses_by_department(
        connection,
        department,
    )


@app.get("/lecturers/publications")
def read_recent_lecturer_publications(
    minimum_year: int,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return lecturer publications from a specified year onwards.

    Args:
        minimum_year: The earliest publication year to include.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of matching lecturer publications.
    """
    return get_recent_lecturer_publications(
        connection,
        minimum_year,
    )


@app.get("/students/by-advisor")
def read_students_by_advisor(
    lecturer_name: str,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return students advised by a specific lecturer.

    Args:
        lecturer_name: The lecturer whose advisees should be returned.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of matching student records.
    """
    return get_students_by_advisor(
        connection,
        lecturer_name,
    )


@app.get("/staff/department")
def read_staff_by_department(
    department: str,
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return staff members employed in a department.

    Args:
        department: The department used to filter staff.
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of academic and non-academic staff members.
    """
    return get_staff_by_department(
        connection,
        department,
    )


@app.get("/lecturers/top-supervisors")
def read_top_research_supervisors(
    connection: DatabaseConnection,
) -> list[dict[str, object]]:
    """Return lecturers ranked by supervised research projects.

    Args:
        connection: A database connection supplied by FastAPI.

    Returns:
        A list of lecturers ordered by projects supervised.
    """
    return get_top_research_supervisors(connection)
