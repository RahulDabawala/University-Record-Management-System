"""Unit tests for the FastAPI application endpoints."""

from collections.abc import Generator
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from mysql.connector import MySQLConnection

from src.database import provide_database_connection
from src.main import app


@pytest.fixture
def mock_connection() -> MagicMock:
    """Return a mocked MySQL connection with a mocked cursor.

    Returns:
        A configured mock database connection.
    """
    connection = MagicMock(spec=MySQLConnection)
    cursor = MagicMock()

    connection.cursor.return_value = cursor

    return connection


@pytest.fixture
def client(
    mock_connection: MagicMock,
) -> Generator[TestClient, None, None]:
    """Return a test client using the mocked database dependency.

    Args:
        mock_connection: The mocked MySQL database connection.

    Yields:
        A FastAPI test client.
    """

    def override_database_connection() -> Generator[
        MySQLConnection,
        None,
        None,
    ]:
        """Yield the mocked connection instead of connecting to MySQL."""
        yield mock_connection

    app.dependency_overrides[provide_database_connection] = override_database_connection

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


def test_read_root(client: TestClient) -> None:
    """Verify that the root endpoint confirms the API is running."""
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "University Record Management API is running",
    }


def test_database_health(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that the database health endpoint returns server details."""
    cursor = mock_connection.cursor.return_value
    cursor.fetchone.return_value = ("8.0.43",)

    response = client.get("/health/database")

    assert response.status_code == 200
    assert response.json() == {
        "status": "connected",
        "database_version": "8.0.43",
    }

    cursor.execute.assert_called_once_with("SELECT VERSION();")
    cursor.close.assert_called_once()


def test_students_by_course(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that students are returned by course and lecturer."""
    expected_students = [
        {
            "student_id": 1,
            "name": "Amara Osei",
            "course_code": "CS301",
            "course_name": "Database Systems",
            "lecturer": "Dr. Patricia Voss",
        },
        {
            "student_id": 9,
            "name": "Ingrid Lindqvist",
            "course_code": "CS301",
            "course_name": "Database Systems",
            "lecturer": "Dr. Patricia Voss",
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_students

    response = client.get(
        "/students/by-course",
        params={
            "course": "CS301",
            "lecturer": "Dr. Patricia Voss",
        },
    )

    assert response.status_code == 200
    assert response.json() == expected_students

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == (
        "CS301",
        "Dr. Patricia Voss",
    )
    cursor.close.assert_called_once()


def test_students_by_course_with_no_matches(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that a valid search with no matches returns an empty list."""
    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = []

    response = client.get(
        "/students/by-course",
        params={
            "course": "CS999",
            "lecturer": "Unknown Lecturer",
        },
    )

    assert response.status_code == 200
    assert response.json() == []


def test_missing_student_query_parameter(
    client: TestClient,
) -> None:
    """Verify that FastAPI rejects a missing required parameter."""
    response = client.get(
        "/students/by-course",
        params={"course": "CS301"},
    )

    assert response.status_code == 422


def test_high_achieving_students(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that high-achieving final-year students are returned."""
    expected_students = [
        {
            "student_id": 6,
            "name": "Kenji Watanabe",
            "year_of_study": 4,
            "average_grade": 92.0,
        },
        {
            "student_id": 3,
            "name": "Priya Nair",
            "year_of_study": 4,
            "average_grade": 89.0,
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_students

    response = client.get("/high-achievers")

    assert response.status_code == 200
    assert response.json() == expected_students
    assert all(student["average_grade"] > 70 for student in response.json())


def test_unregistered_students(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that students without semester enrolments are returned."""
    expected_students = [
        {
            "student_id": 20,
            "name": "Ali Hassan",
            "contact_info": ("a.hassan@uni.edu | +44 7700 900020"),
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_students

    response = client.get(
        "/unregistered-students",
        params={"semester": "2025/26"},
    )

    assert response.status_code == 200
    assert response.json() == expected_students

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == ("2025/26",)


def test_student_advisor(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that advisor details are returned for a student."""
    expected_advisor = [
        {
            "student_id": 1,
            "student": "Amara Osei",
            "advisor": "Dr. Patricia Voss",
            "department": "Computer Science",
            "research_interests": ("Distributed Databases, Machine Learning"),
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_advisor

    response = client.get(
        "/students/advisor",
        params={"student_id": 1},
    )

    assert response.status_code == 200
    assert response.json() == expected_advisor

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == (1,)


def test_lecturers_by_research_area(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that lecturers can be searched by research area."""
    expected_lecturers = [
        {
            "lecturer_id": 1,
            "name": "Dr. Patricia Voss",
            "research_interests": ("Distributed Databases, Machine Learning"),
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_lecturers

    response = client.get(
        "/lecturers/research",
        params={"research_area": "Machine Learning"},
    )

    assert response.status_code == 200
    assert response.json() == expected_lecturers

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == ("%Machine Learning%",)


def test_courses_by_department(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that courses are returned by lecturer department."""
    expected_courses = [
        {
            "course_code": "CS101",
            "course_name": "Introduction to Programming",
            "lecturer": "Dr. Patricia Voss",
            "department": "Computer Science",
        },
        {
            "course_code": "CS201",
            "course_name": "Data Structures and Algorithms",
            "lecturer": "Dr. Ananya Krishnan",
            "department": "Computer Science",
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_courses

    response = client.get(
        "/courses/department",
        params={"department": "Computer Science"},
    )

    assert response.status_code == 200
    assert response.json() == expected_courses

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == ("Computer Science",)


def test_recent_lecturer_publications(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that lecturer publications are filtered by year."""
    expected_publications = [
        {
            "lecturer_id": 3,
            "lecturer": "Dr. Ananya Krishnan",
            "title": "Advances in Deep Learning",
            "year": 2025,
        },
        {
            "lecturer_id": 1,
            "lecturer": "Dr. Patricia Voss",
            "title": "Scalable Query Processing",
            "year": 2024,
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_publications

    response = client.get(
        "/lecturers/publications",
        params={"minimum_year": 2024},
    )

    assert response.status_code == 200
    assert response.json() == expected_publications

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == (2024,)


def test_students_by_advisor(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that students are returned for a specified advisor."""
    expected_students = [
        {
            "student_id": 13,
            "student_name": "Aisha Kamara",
            "advisor": "Dr. Patricia Voss",
            "year_of_study": 3,
            "graduation_status": "Enrolled",
        },
        {
            "student_id": 1,
            "student_name": "Amara Osei",
            "advisor": "Dr. Patricia Voss",
            "year_of_study": 4,
            "graduation_status": "Final Year",
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_students

    response = client.get(
        "/students/by-advisor",
        params={"lecturer_name": "Dr. Patricia Voss"},
    )

    assert response.status_code == 200
    assert response.json() == expected_students

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == ("Dr. Patricia Voss",)


def test_staff_by_department(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that staff members are returned by department."""
    expected_staff = [
        {
            "employee_id": 3,
            "employee_name": "Linda Ahmed",
            "role": "Finance Officer",
            "department": "Finance",
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_staff

    response = client.get(
        "/staff/department",
        params={"department": "Finance"},
    )

    assert response.status_code == 200
    assert response.json() == expected_staff

    execute_args = cursor.execute.call_args.args

    assert execute_args[1] == (
        "Finance",
        "Finance",
    )


def test_top_research_supervisors(
    client: TestClient,
    mock_connection: MagicMock,
) -> None:
    """Verify that lecturers are ranked by supervised projects."""
    expected_supervisors = [
        {
            "lecturer_id": 3,
            "name": "Dr. Ananya Krishnan",
            "projects_supervised": 3,
        },
        {
            "lecturer_id": 1,
            "name": "Dr. Patricia Voss",
            "projects_supervised": 1,
        },
    ]

    cursor = mock_connection.cursor.return_value
    cursor.fetchall.return_value = expected_supervisors

    response = client.get("/lecturers/top-supervisors")

    assert response.status_code == 200
    assert response.json() == expected_supervisors
    assert response.json()[0]["projects_supervised"] == 3
