DROP SCHEMA YU_Reviews;

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