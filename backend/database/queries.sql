USE university_records;

-- =====================================================
-- Query 1
-- Find all students enrolled in a specific course taught
-- by a particular lecturer.
-- =====================================================

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
WHERE c.course_code = 'CS301'
AND l.name = 'Dr. Patricia Voss';


-- =====================================================
-- Query 2
-- Students with an average grade above 70%
-- in their final year.
-- =====================================================

SELECT
    s.student_id,
    s.name,
    s.year_of_study,
    ROUND(AVG(g.grade),2) AS average_grade
FROM Students s
JOIN Student_Grades g
    ON s.student_id = g.student_id
WHERE s.year_of_study = 4
GROUP BY
    s.student_id,
    s.name,
    s.year_of_study
HAVING AVG(g.grade) > 70;


-- =====================================================
-- Query 3
-- Students not registered this semester.
-- =====================================================

SELECT
    s.student_id,
    s.name,
    s.contact_info
FROM Students s
LEFT JOIN Student_Course_Enrolment e
    ON s.student_id = e.student_id
    AND e.semester = '2025/26'
WHERE e.student_id IS NULL;


-- =====================================================
-- Query 4
-- Faculty advisor details for a student.
-- =====================================================

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
WHERE s.student_id = 1;


-- =====================================================
-- Query 5
-- Lecturers with expertise in a research area.
-- Example: search for Machine Learning
-- =====================================================

SELECT
    lecturer_id,
    name,
    research_interests
FROM Lecturers
WHERE research_interests LIKE '%Machine Learning%';


-- =====================================================
-- Query 6
-- Courses taught in a department.
-- Accounts for the condition where a lecturer from another dept may teach a course in another.
-- =====================================================

SELECT
    c.course_code,
    c.name,
    d.name AS department,
    l.name AS lecturer
FROM Courses c
JOIN Lecturer_Course_Assignment lca
    ON c.course_code = lca.course_code
JOIN Lecturers l
    ON lca.lecturer_id = l.lecturer_id
JOIN Departments d
    ON l.department_id = d.department_id
WHERE d.name = 'Computer Science';


-- =====================================================
-- Query 7
-- Publications during the past years.
-- =====================================================

SELECT
    l.name,
    p.title,
    p.year
FROM Lecturer_Publications p
JOIN Lecturers l
    ON p.lecturer_id = l.lecturer_id
WHERE p.year = 2025
ORDER BY p.year DESC;


-- =====================================================
-- Query 8
-- Students advised by a particular lecturer.
-- =====================================================

SELECT
    s.student_id,
    s.name,
    s.year_of_study,
    s.graduation_status
FROM Students s
JOIN Lecturers l
    ON s.advisor_id = l.lecturer_id
WHERE l.name = 'Dr. Patricia Voss';


-- =====================================================
-- Query 9
-- All academic and non-academic staff members employed in a department.
-- =====================================================

SELECT
    l.lecturer_id AS employee_id,
    l.name AS employee_name,
    'Lecturer' AS role,
    d.name AS department
FROM Lecturers l
JOIN Departments d
    ON l.department_id = d.department_id
WHERE d.name = 'Finance'

UNION ALL

SELECT
    s.staff_id AS employee_id,
    s.name AS employee_name,
    s.job_title AS role,
    d.name AS department
FROM Non_Academic_Staff s
JOIN Departments d
    ON s.department_id = d.department_id
WHERE d.name = 'Finance';


-- =====================================================
-- Query 10
-- Lecturers supervising the most research projects.
-- =====================================================

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
ORDER BY projects_supervised DESC;
