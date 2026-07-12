"""Database query functions for the University Record Management System."""

from __future__ import annotations

from mysql.connector import MySQLConnection


def get_students_by_course_and_lecturer(
    connection: MySQLConnection,
    course_code: str,
    lecturer_name: str,
) -> list[dict[str, object]]:
    """Return students enrolled on a course taught by a lecturer.

    Args:
        connection: An active MySQL database connection.
        course_code: The course code to search for.
        lecturer_name: The lecturer teaching the course.

    Returns:
        A list of matching student records.
    """
    query = """
        SELECT
            s.student_id,
            s.name,
            c.course_code,
            c.name AS course_name,
            l.name AS lecturer
        FROM Students s
        JOIN Student_Course_Enrolment e
            ON s.student_id = e.student_id
        JOIN Courses c
            ON e.course_code = c.course_code
        JOIN Lecturer_Course_Assignment lca
            ON c.course_code = lca.course_code
        JOIN Lecturers l
            ON lca.lecturer_id = l.lecturer_id
        WHERE c.course_code = %s
          AND l.name = %s;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (course_code, lecturer_name))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_high_achieving_students(
    connection: MySQLConnection,
) -> list[dict[str, object]]:
    """Return final-year students with an average grade above 70%.

    Args:
        connection: An active MySQL database connection.

    Returns:
        A list of final-year students whose average grade exceeds 70%.
    """
    query = """
        SELECT
            s.student_id,
            s.name,
            s.year_of_study,
            ROUND(AVG(g.grade), 2) AS average_grade
        FROM Students s
        JOIN Student_Grades g
            ON s.student_id = g.student_id
        WHERE s.year_of_study = 4
        GROUP BY
            s.student_id,
            s.name,
            s.year_of_study
        HAVING AVG(g.grade) > 70;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query)
        results = cursor.fetchall()
        for row in results:
            if "average_grade" in row:
                row["average_grade"] = float(row["average_grade"])
    finally:
        cursor.close()

    return results


def get_unregistered_students(
    connection: MySQLConnection,
    semester: str,
) -> list[dict[str, object]]:
    """Return students with no course enrolments in a semester.

    Args:
        connection: An active MySQL database connection.
        semester: The semester used to check student enrolments.

    Returns:
        A list of students who have no enrolments in the given semester.
    """
    query = """
        SELECT
            s.student_id,
            s.name,
            s.contact_info
        FROM Students s
        LEFT JOIN Student_Course_Enrolment e
            ON s.student_id = e.student_id
            AND e.semester = %s
        WHERE e.student_id IS NULL;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (semester,))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_student_advisor(
    connection: MySQLConnection,
    student_id: int,
) -> list[dict[str, object]]:
    """Return advisor details for a specific student.

    Args:
        connection: An active MySQL database connection.
        student_id: The ID of the student whose advisor is required.

    Returns:
        A list containing the student and advisor details.
    """
    query = """
        SELECT
            s.student_id,
            s.name AS student,
            l.name AS advisor,
            d.name AS department,
            l.research_interests
        FROM Students s
        JOIN Lecturers l
            ON s.advisor_id = l.lecturer_id
        JOIN Departments d
            ON l.department_id = d.department_id
        WHERE s.student_id = %s;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (student_id,))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_lecturers_by_research_area(
    connection: MySQLConnection,
    research_area: str,
) -> list[dict[str, object]]:
    """Return lecturers whose research interests match a given area.

    Args:
        connection: An active MySQL database connection.
        research_area: The research area used to filter lecturers.

    Returns:
        A list of lecturers with matching research interests.
    """
    query = """
        SELECT
            lecturer_id,
            name,
            research_interests
        FROM Lecturers
        WHERE research_interests LIKE %s;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (f"%{research_area}%",))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_courses_by_department(
    connection: MySQLConnection,
    department: str,
) -> list[dict[str, object]]:
    """Return courses taught by lecturers in a specific department.

    Args:
        connection: An active MySQL database connection.
        department: The department used to filter courses.

    Returns:
        A list of courses taught by lecturers in the specified department.
    """
    query = """
        SELECT DISTINCT
            c.course_code,
            c.name AS course_name,
            l.name AS lecturer,
            d.name AS department
        FROM Courses c
        JOIN Lecturer_Course_Assignment lca
            ON c.course_code = lca.course_code
        JOIN Lecturers l
            ON lca.lecturer_id = l.lecturer_id
        JOIN Departments d
            ON l.department_id = d.department_id
        WHERE d.name = %s
        ORDER BY c.course_code;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (department,))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_recent_lecturer_publications(
    connection: MySQLConnection,
    minimum_year: int,
) -> list[dict[str, object]]:
    """Return lecturer publications from a specified year onwards.

    Args:
        connection: An active MySQL database connection.
        minimum_year: The earliest publication year to include.

    Returns:
        A list of lecturer publications ordered by year descending.
    """
    query = """
        SELECT
            l.lecturer_id,
            l.name AS lecturer,
            p.title,
            p.year
        FROM Lecturer_Publications p
        JOIN Lecturers l
            ON p.lecturer_id = l.lecturer_id
        WHERE p.year >= %s
        ORDER BY
            p.year DESC,
            l.name,
            p.title;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (minimum_year,))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_students_by_advisor(
    connection: MySQLConnection,
    lecturer_name: str,
) -> list[dict[str, object]]:
    """Return students advised by a specific lecturer.

    Args:
        connection: An active MySQL database connection.
        lecturer_name: The lecturer whose advisees should be returned.

    Returns:
        A list of students advised by the specified lecturer.
    """
    query = """
        SELECT
            s.student_id,
            s.name AS student_name,
            l.name AS advisor,
            s.year_of_study,
            s.graduation_status
        FROM Students s
        JOIN Lecturers l
            ON s.advisor_id = l.lecturer_id
        WHERE l.name = %s
        ORDER BY s.name;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (lecturer_name,))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_staff_by_department(
    connection: MySQLConnection,
    department: str,
) -> list[dict[str, object]]:
    """Return all staff employed in a specific department.

    Args:
        connection: An active MySQL database connection.
        department: The department used to filter staff.

    Returns:
        A list of academic and non-academic staff members.
    """
    query = """
        SELECT
            l.lecturer_id AS employee_id,
            l.name AS employee_name,
            'Lecturer' AS role,
            d.name AS department
        FROM Lecturers l
        JOIN Departments d
            ON l.department_id = d.department_id
        WHERE d.name = %s

        UNION ALL

        SELECT
            s.staff_id AS employee_id,
            s.name AS employee_name,
            s.job_title AS role,
            d.name AS department
        FROM Non_Academic_Staff s
        JOIN Departments d
            ON s.department_id = d.department_id
        WHERE d.name = %s

        ORDER BY employee_name;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query, (department, department))
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results


def get_top_research_supervisors(
    connection: MySQLConnection,
) -> list[dict[str, object]]:
    """Return lecturers ranked by the number of projects they supervise.

    Args:
        connection: An active MySQL database connection.

    Returns:
        A list of lecturers ordered by projects supervised, highest first.
    """
    query = """
        SELECT
            l.lecturer_id,
            l.name,
            COUNT(r.project_id) AS projects_supervised
        FROM Lecturers l
        LEFT JOIN Research_Projects r
            ON l.lecturer_id = r.principal_investigator
        GROUP BY
            l.lecturer_id,
            l.name
        ORDER BY
            projects_supervised DESC,
            l.name;
    """

    cursor = connection.cursor(dictionary=True)

    try:
        cursor.execute(query)
        results = cursor.fetchall()
    finally:
        cursor.close()

    return results
