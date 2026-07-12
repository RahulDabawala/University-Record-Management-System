DROP DATABASE IF EXISTS university_records;
CREATE DATABASE IF NOT EXISTS university_records;
USE university_records;

CREATE TABLE Departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    faculty VARCHAR(100) NOT NULL,
    research_areas TEXT
);

CREATE TABLE Programs (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    degree_awarded VARCHAR(100) NOT NULL,
    duration INT NOT NULL
);

CREATE TABLE Courses (
    course_code VARCHAR(20) PRIMARY KEY,
    department_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    credits INT NOT NULL,
    schedule VARCHAR(100),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Lecturers (
    lecturer_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    course_load INT,
    research_interests TEXT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    advisor_id INT,
    name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    contact_info VARCHAR(255),
    year_of_study INT NOT NULL,
    graduation_status VARCHAR(50),
    FOREIGN KEY (program_id) REFERENCES Programs(program_id),
    FOREIGN KEY (advisor_id) REFERENCES Lecturers(lecturer_id)
);

CREATE TABLE Student_Course_Enrolment (
    student_id INT NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    status VARCHAR(50),
    PRIMARY KEY (student_id, course_code, semester),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Student_Grades (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    grade DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Student_Disciplinary_Records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    description TEXT NOT NULL,
    record_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

CREATE TABLE Student_Organisations (
    org_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    organisation_name VARCHAR(100) NOT NULL,
    role VARCHAR(50),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

CREATE TABLE Course_Prerequisites (
    prereq_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    prereq_course_code VARCHAR(20) NOT NULL,
    FOREIGN KEY (course_code) REFERENCES Courses(course_code),
    FOREIGN KEY (prereq_course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Course_Materials (
    material_id INT AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,
    material_link VARCHAR(255) NOT NULL,
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Lecturer_Qualifications (
    qualification_id INT AUTO_INCREMENT PRIMARY KEY,
    lecturer_id INT NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturers(lecturer_id)
);

CREATE TABLE Lecturer_Committees (
    committee_id INT AUTO_INCREMENT PRIMARY KEY,
    lecturer_id INT NOT NULL,
    committee_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturers(lecturer_id)
);

CREATE TABLE Lecturer_Publications (
    publication_id INT AUTO_INCREMENT PRIMARY KEY,
    lecturer_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (lecturer_id) REFERENCES Lecturers(lecturer_id)
);

CREATE TABLE Lecturer_Course_Assignment (
    lecturer_id INT NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    PRIMARY KEY (lecturer_id, course_code, semester),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturers(lecturer_id),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Program_Course_Requirements (
    requirement_id INT AUTO_INCREMENT PRIMARY KEY,
    program_id INT NOT NULL,
    course_code VARCHAR(20) NOT NULL,
    FOREIGN KEY (program_id) REFERENCES Programs(program_id),
    FOREIGN KEY (course_code) REFERENCES Courses(course_code)
);

CREATE TABLE Non_Academic_Staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    employment_type VARCHAR(50),
    contract_details TEXT,
    salary_info VARCHAR(100),
    emergency_contact VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Research_Projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    principal_investigator INT NOT NULL,
    funding_source VARCHAR(255),
    outcomes TEXT,
    FOREIGN KEY (principal_investigator) REFERENCES Lecturers(lecturer_id)
);

CREATE TABLE Research_Team_Members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    lecturer_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Research_Projects(project_id),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturers(lecturer_id)
);

CREATE TABLE Research_Publications (
    publication_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Research_Projects(project_id)
);

CREATE TABLE Research_Groups (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    head_lecturer_id INT UNIQUE NOT NULL,
    FOREIGN KEY (head_lecturer_id) REFERENCES Lecturers(lecturer_id)
);