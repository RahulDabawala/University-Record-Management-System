USE university_records;

INSERT INTO Departments (department_id, name, faculty, research_areas) VALUES
(1, 'Computer Science', 'Science and Technology', 'AI, Databases, Machine Learning'),
(2, 'Mathematics', 'Science and Technology', 'Graph Theory, Numerical Methods'),
(3, 'Business', 'Business School', 'Strategy, Management'),
(4, 'Physics', 'Science and Technology', 'Quantum Computing, Photonics'),
(5, 'Engineering', 'Engineering Faculty', 'Robotics, IoT'),
(6, 'Arts & Humanities', 'Humanities Faculty', 'Literature, Linguistics'),
(7, 'Academic Affairs', 'Administration', NULL),
(8, 'IT Services', 'Administration', NULL),
(9, 'Finance', 'Administration', NULL),
(10, 'Research Office', 'Administration', NULL),
(11, 'Human Resources', 'Administration', NULL);

INSERT INTO Programs (program_id, name, degree_awarded, duration) VALUES
(1, 'Computer Science', 'BSc Computer Science', 4),
(2, 'Mathematics', 'BSc Mathematics', 3),
(3, 'Business', 'BA Business Management', 3),
(4, 'Physics', 'BSc Physics', 3),
(5, 'Engineering', 'BEng Engineering', 3),
(6, 'Arts & Humanities', 'BA Arts and Humanities', 4);

INSERT INTO Lecturers (lecturer_id, department_id, name, course_load, research_interests) VALUES
(1, 1, 'Dr. Patricia Voss', 3, 'Distributed Databases, Machine Learning'),
(2, 2, 'Prof. James Osei', 2, 'Numerical Methods, Graph Theory'),
(3, 1, 'Dr. Ananya Krishnan', 3, 'Deep Learning, NLP'),
(4, 3, 'Prof. Bruno Castillo', 2, 'Organisational Behaviour'),
(5, 4, 'Dr. Sarah Thornton', 2, 'Quantum Computing, Photonics'),
(6, 6, 'Prof. Yuki Tanaka', 1, 'Post-Colonial Literature'),
(7, 5, 'Dr. Hassan El-Amin', 2, 'Autonomous Systems, IoT');

INSERT INTO Courses (course_code, department_id, name, description, level, credits, schedule) VALUES
('CS101', 1, 'Introduction to Programming', 'Introductory programming concepts.', 'Level 1', 20, 'Mon 09:00'),
('CS201', 1, 'Data Structures and Algorithms', 'Core data structures and algorithms.', 'Level 2', 20, 'Tue 10:00'),
('CS301', 1, 'Database Systems', 'Relational databases and SQL.', 'Level 3', 20, 'Wed 11:00'),
('CS401', 1, 'Machine Learning', 'Applied machine learning methods.', 'Level 4', 20, 'Thu 13:00'),
('CS501', 1, 'Cloud Computing', 'Cloud architecture and deployment.', 'Level 4', 20, 'Fri 14:00'),
('MATH101', 2, 'Calculus I', 'Differential and integral calculus.', 'Level 1', 20, 'Mon 10:00'),
('MATH201', 2, 'Linear Algebra', 'Vector spaces and matrices.', 'Level 2', 20, 'Tue 11:00'),
('PHY101', 4, 'Physics I', 'Classical mechanics and waves.', 'Level 1', 20, 'Wed 09:00'),
('PHY201', 4, 'Quantum Mechanics', 'Foundations of quantum theory.', 'Level 2', 20, 'Thu 10:00'),
('BUS101', 3, 'Introduction to Business', 'Business fundamentals.', 'Level 1', 20, 'Mon 12:00'),
('BUS201', 3, 'Strategic Management', 'Strategic decision-making.', 'Level 2', 20, 'Tue 13:00'),
('ENG101', 5, 'Systems Engineering I', 'Systems engineering principles.', 'Level 1', 20, 'Wed 14:00'),
('ENG201', 5, 'Robotics Fundamentals', 'Robotics concepts and design.', 'Level 2', 20, 'Thu 15:00'),
('HUM101', 6, 'Modern Literature', 'Modern literary analysis.', 'Level 1', 20, 'Fri 10:00');

INSERT INTO Students (student_id, program_id, advisor_id, name, date_of_birth, contact_info, year_of_study, graduation_status) VALUES
(1, 1, 1, 'Amara Osei', '2002-04-12', 'a.osei@uni.edu | +44 7700 900001', 4, 'Final Year'),
(2, 2, 2, 'Luca Ferretti', '2005-02-18', 'l.ferretti@uni.edu | +44 7700 900002', 1, 'Enrolled'),
(3, 1, 3, 'Priya Nair', '2002-09-05', 'p.nair@uni.edu | +44 7700 900003', 4, 'Final Year'),
(4, 3, 4, 'Tobias Müller', '2004-01-21', 't.muller@uni.edu | +44 7700 900004', 2, 'Enrolled'),
(5, 4, 5, 'Fatima Al-Hassan', '2003-06-16', 'f.alhassan@uni.edu | +44 7700 900005', 3, 'Enrolled'),
(6, 1, 1, 'Kenji Watanabe', '2002-11-08', 'k.watanabe@uni.edu | +44 7700 900006', 4, 'Final Year'),
(7, 5, 7, 'Sophia Papadakis', '2004-07-24', 's.papadakis@uni.edu | +44 7700 900007', 2, 'Enrolled'),
(8, 2, 2, 'Ravi Shankar', '2005-03-12', 'r.shankar@uni.edu | +44 7700 900008', 1, 'Enrolled'),
(9, 1, 3, 'Ingrid Lindqvist', '2003-10-30', 'i.lindqvist@uni.edu | +44 7700 900009', 3, 'Enrolled'),
(10, 3, 4, 'Marcus Okonkwo', '2005-08-19', 'm.okonkwo@uni.edu | +44 7700 900010', 1, 'Enrolled'),
(11, 4, 5, 'Zara Ivanova', '2004-05-25', 'z.ivanova@uni.edu | +44 7700 900011', 2, 'Enrolled'),
(12, 5, 7, 'Diego Reyes', '2005-12-02', 'd.reyes@uni.edu | +44 7700 900012', 1, 'Enrolled'),
(13, 1, 1, 'Aisha Kamara', '2003-03-07', 'a.kamara@uni.edu | +44 7700 900013', 3, 'Enrolled'),
(14, 6, 6, 'Finn O''Brien', '2002-02-20', 'f.obrien@uni.edu | +44 7700 900014', 4, 'Final Year'),
(15, 1, 3, 'Mei Zhang', '2005-01-17', 'm.zhang@uni.edu | +44 7700 900015', 1, 'Enrolled'),
(16, 2, 2, 'Omar Farooqi', '2003-09-11', 'o.farooqi@uni.edu | +44 7700 900016', 3, 'Enrolled'),
(17, 4, 5, 'Elena Kozlova', '2004-04-04', 'e.kozlova@uni.edu | +44 7700 900017', 2, 'Enrolled'),
(18, 3, 4, 'Kwame Asante', '2002-06-29', 'k.asante@uni.edu | +44 7700 900018', 4, 'Final Year'),
(19, 5, 7, 'Sara Lindström', '2004-10-15', 's.lindstrom@uni.edu | +44 7700 900019', 2, 'Enrolled'),
(20, 1, 1, 'Ali Hassan', '2005-07-03', 'a.hassan@uni.edu | +44 7700 900020', 1, 'Enrolled');

-- -----------------------------------------------------
-- Lecturer Course Assignments
-- -----------------------------------------------------

INSERT INTO Lecturer_Course_Assignment (lecturer_id, course_code, semester) VALUES
(1,'CS101','2025/26'),
(1,'CS301','2025/26'),
(2,'MATH101','2025/26'),
(2,'MATH201','2025/26'),
(3,'CS201','2025/26'),
(3,'CS401','2025/26'),
(4,'BUS101','2025/26'),
(4,'BUS201','2025/26'),
(5,'PHY101','2025/26'),
(5,'PHY201','2025/26'),
(6,'HUM101','2025/26'),
(7,'ENG101','2025/26'),
(7,'ENG201','2025/26'),
(1,'CS501','2025/26');

-- -----------------------------------------------------
-- Student Enrolments
-- -----------------------------------------------------

INSERT INTO Student_Course_Enrolment (student_id, course_code, semester, status) VALUES
(1,'CS301','2025/26','Enrolled'),
(1,'CS401','2025/26','Enrolled'),
(2,'MATH101','2025/26','Enrolled'),
(3,'CS401','2025/26','Enrolled'),
(3,'CS501','2025/26','Enrolled'),
(4,'BUS201','2025/26','Enrolled'),
(5,'PHY201','2025/26','Enrolled'),
(6,'CS401','2025/26','Enrolled'),
(6,'CS501','2025/26','Enrolled'),
(7,'ENG201','2025/26','Enrolled'),
(8,'MATH101','2025/26','Enrolled'),
(9,'CS301','2025/26','Enrolled'),
(10,'BUS101','2025/26','Enrolled'),
(11,'PHY101','2025/26','Enrolled'),
(12,'ENG101','2025/26','Enrolled'),
(13,'CS201','2025/26','Enrolled'),
(14,'HUM101','2025/26','Enrolled'),
(15,'CS101','2025/26','Enrolled'),
(16,'MATH201','2025/26','Enrolled'),
(17,'PHY101','2025/26','Enrolled'),
(18,'BUS201','2025/26','Enrolled'),
(19,'ENG201','2025/26','Enrolled');

-- Student 20 deliberately has no enrolments

-- -----------------------------------------------------
-- Student Grades
-- -----------------------------------------------------

INSERT INTO Student_Grades (student_id, course_code, grade) VALUES
(1,'CS301',84.5),
(1,'CS401',88.0),
(2,'MATH101',67.0),
(3,'CS401',91.0),
(3,'CS501',87.0),
(4,'BUS201',74.0),
(5,'PHY201',78.0),
(6,'CS401',94.0),
(6,'CS501',90.0),
(7,'ENG201',71.0),
(8,'MATH101',63.0),
(9,'CS301',82.0),
(10,'BUS101',69.0),
(11,'PHY101',76.0),
(12,'ENG101',72.0),
(13,'CS201',85.0),
(14,'HUM101',81.0),
(15,'CS101',66.0),
(16,'MATH201',79.0),
(17,'PHY101',74.0),
(18,'BUS201',86.0),
(19,'ENG201',73.0);

-- -----------------------------------------------------
-- Course Prerequisites
-- -----------------------------------------------------

INSERT INTO Course_Prerequisites (course_code, prereq_course_code) VALUES
('CS201','CS101'),
('CS301','CS201'),
('CS401','CS301'),
('CS501','CS401'),
('MATH201','MATH101'),
('PHY201','PHY101'),
('BUS201','BUS101'),
('ENG201','ENG101');

-- -----------------------------------------------------
-- Course Materials
-- -----------------------------------------------------

INSERT INTO Course_Materials (course_code, material_link) VALUES
('CS101','https://uni.edu/cs101'),
('CS201','https://uni.edu/cs201'),
('CS301','https://uni.edu/cs301'),
('CS401','https://uni.edu/cs401'),
('CS501','https://uni.edu/cs501');

-- -----------------------------------------------------
-- Lecturer Qualifications
-- -----------------------------------------------------

INSERT INTO Lecturer_Qualifications (lecturer_id, qualification) VALUES
(1,'PhD Computer Science'),
(2,'PhD Mathematics'),
(3,'PhD Artificial Intelligence'),
(4,'PhD Business Management'),
(5,'PhD Physics'),
(6,'PhD Literature'),
(7,'PhD Mechanical Engineering');

-- -----------------------------------------------------
-- Lecturer Committees
-- -----------------------------------------------------

INSERT INTO Lecturer_Committees (lecturer_id, committee_name) VALUES
(1,'Teaching Committee'),
(2,'Research Committee'),
(3,'Ethics Committee'),
(4,'Curriculum Committee'),
(5,'Research Committee'),
(6,'Library Committee'),
(7,'Health and Safety Committee');

-- -----------------------------------------------------
-- Lecturer Publications
-- -----------------------------------------------------

INSERT INTO Lecturer_Publications (lecturer_id,title,year) VALUES
(1,'Distributed Database Optimisation',2025),
(1,'Scalable Query Processing',2024),
(2,'Modern Graph Theory',2025),
(3,'Advances in Deep Learning',2025),
(3,'Natural Language Systems',2024),
(4,'Business Strategy in Practice',2025),
(5,'Quantum Photonics',2025),
(6,'Post Colonial Narratives',2024),
(7,'Autonomous Robotic Systems',2025);

-- -----------------------------------------------------
-- Programme Requirements
-- -----------------------------------------------------

INSERT INTO Program_Course_Requirements (program_id,course_code) VALUES
(1,'CS101'),
(1,'CS201'),
(1,'CS301'),
(1,'CS401'),
(2,'MATH101'),
(2,'MATH201'),
(3,'BUS101'),
(3,'BUS201'),
(4,'PHY101'),
(4,'PHY201'),
(5,'ENG101'),
(5,'ENG201'),
(6,'HUM101');

-- -----------------------------------------------------
-- Non Academic Staff
-- -----------------------------------------------------

INSERT INTO Non_Academic_Staff
(department_id,name,job_title,employment_type,contract_details,salary_info,emergency_contact)
VALUES
(7,'Emily Carter','Registry Officer','Full-Time','Permanent','£32000','John Carter'),
(8,'Daniel Brooks','IT Support Engineer','Full-Time','Permanent','£36000','Sarah Brooks'),
(9,'Linda Ahmed','Finance Officer','Full-Time','Permanent','£39000','Omar Ahmed'),
(10,'Rebecca Jones','Research Administrator','Part-Time','Permanent','£28000','Mark Jones'),
(11,'Michael Green','HR Officer','Full-Time','Permanent','£35000','Laura Green');

-- -----------------------------------------------------
-- Research Projects
-- -----------------------------------------------------

INSERT INTO Research_Projects
(title, principal_investigator, funding_source, outcomes)
VALUES
('AI for Healthcare',3,'UKRI','Clinical prediction models'),
('Cloud Database Optimisation',1,'EPSRC','Query optimisation techniques'),
('Quantum Computing Algorithms',5,'Innovate UK','Prototype algorithms'),
('Autonomous Robotics',7,'EPSRC','Navigation platform'),
('Explainable AI for Healthcare',3,'UKRI','Interpretable AI framework'),
('Large Language Models in Education',3,'EPSRC','Educational AI platform');

-- -----------------------------------------------------
-- Research Team Members
-- -----------------------------------------------------

INSERT INTO Research_Team_Members (project_id,lecturer_id) VALUES
(1,3),
(1,1),
(2,1),
(2,3),
(3,5),
(4,7);

-- -----------------------------------------------------
-- Research Publications
-- -----------------------------------------------------

INSERT INTO Research_Publications (project_id,title,year) VALUES
(1,'AI Diagnostic Systems',2025),
(2,'Cloud Database Performance',2025),
(3,'Quantum Algorithm Optimisation',2024),
(4,'Robotic Navigation Systems',2025);

-- -----------------------------------------------------
-- Research Groups
-- -----------------------------------------------------

INSERT INTO Research_Groups (head_lecturer_id) VALUES
(1),
(3),
(5),
(7);

-- -----------------------------------------------------
-- Student Organisations
-- -----------------------------------------------------

INSERT INTO Student_Organisations
(student_id,organisation_name,role)
VALUES
(1,'Computer Society','President'),
(3,'AI Society','Member'),
(6,'Programming Club','Treasurer'),
(9,'Women in STEM','Member'),
(14,'Literature Society','Secretary');

-- -----------------------------------------------------
-- Disciplinary Records
-- -----------------------------------------------------

INSERT INTO Student_Disciplinary_Records
(student_id,description,record_date)
VALUES
(10,'Late submission of academic misconduct form','2025-10-12');