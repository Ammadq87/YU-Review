-- DROP SCHEMA YU_Reviews;

CREATE SCHEMA YU_Reviews;

USE YU_Reviews;


CREATE TABLE Course (
	CourseCode VARCHAR(8) PRIMARY KEY,
    Name VARCHAR(255),
    Description VARCHAR(1000)
);

CREATE TABLE Professor (
	ProfessorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE
);

CREATE TABLE Major (
	MajorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255)
);

CREATE TABLE Student (
	StudentID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Password VARCHAR(255),
    Bio VARCHAR(1000),
	MajorID INT,
    FOREIGN KEY (MajorID) REFERENCES Major(MajorID) 
);

SELECT * FROM Student;

CREATE TABLE CoursesTaught (
	CourseCode VARCHAR(8),
    ProfessorID INT,
    FOREIGN KEY (CourseCode) REFERENCES Course(CourseCode),
	FOREIGN KEY (ProfessorID) REFERENCES Professor(ProfessorID) 
);

CREATE TABLE StudentTakesCourse (
	StudentID INT,
    CourseCode VARCHAR(8),
	FOREIGN KEY (CourseCode) REFERENCES Course(CourseCode),
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) 
);

CREATE TABLE CourseReview (
	ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode VARCHAR(8),
    StudentID INT,
    ProfessorID INT,
    Username VARCHAR(255),
    DatePosted DATE,
    Review VARCHAR(1000),
    Easiness INT,
    Usefulness INT,
    Liked TINYINT,
    Retake TINYINT,
    FOREIGN KEY (ProfessorID) REFERENCES Professor(ProfessorID),
	FOREIGN KEY (CourseCode) REFERENCES Course(CourseCode),
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) 
);

CREATE TABLE StudentCourseReview (
	StudentID INT,
    ReviewID INT,
	FOREIGN KEY (ReviewID) REFERENCES CourseReview(ReviewID),
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) 
);

CREATE TABLE ProfessorReview (
	ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode VARCHAR(8),
    StudentID INT,
    ProfessorID INT,
    Username VARCHAR(255),
    DatePosted DATE,
    Review VARCHAR(1000),
    Engaging INT,
    Clarity INT,
    Liked TINYINT,
    Retake TINYINT,
    FOREIGN KEY (ProfessorID) REFERENCES Professor(ProfessorID),
	FOREIGN KEY (CourseCode) REFERENCES Course(CourseCode),
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) 
);

CREATE TABLE StudentProfessorReview (
	StudentID INT,
    ReviewID INT,
    FOREIGN KEY (ReviewID) REFERENCES ProfessorReview(ReviewID),
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID)    
);

select
	c.*,
	sum(cr.Liked = 1) / count(*) * 100 as LikedPercentage,
	sum(cr.Retake = 1) / count(*) * 100 as RetakePercentage,
	avg(cr.Easiness) as Easiness,
	avg(cr.Usefulness) as Usefulness
from CourseReview cr
inner join Course c 
on c.CourseCode = cr.CourseCode
where cr.CourseCode = 'EECS3311' ;

update Course
set Description = 'A study of design methods and their use in the correct implementation, maintenance and evolution of software systems. Topics include design, implementation, testing, documentation needs and standards, support tools. Students design and implement components of a software system'
where CourseCode = 'EECS3311';
select * from Course;

alter table CourseReview
add column (
	Likes TINYINT DEFAULT 0,
    Dislikes TINYINT DEFAULT 0
);