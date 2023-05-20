DROP SCHEMA YU_Reviews;

CREATE SCHEMA YU_Reviews;

USE YU_Reviews;

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

CREATE TABLE CourseReview (
	ReviewID INT AUTO_INCREMENT PRIMARY KEY,
    CourseCode VARCHAR(50),
    StudentID INT,
    ProfessorName VARCHAR(255),
    Username VARCHAR(255),
    DatePosted DATE,
    Review VARCHAR(1000),
    Easiness INT,
    Usefulness INT,
    Liked TINYINT,
    Retake TINYINT,
    Likes INT,
    Dislikes INT,
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
    CourseCode VARCHAR(50),
    StudentID INT,
    ProfessorName VARCHAR(255),
    Username VARCHAR(255),
    DatePosted DATE,
    Review VARCHAR(1000),
    Engaging INT,
    Clarity INT,
    Liked TINYINT,
    Retake TINYINT,
    Likes INT,
    Dislikes INT,
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID) 
);

CREATE TABLE StudentProfessorReview (
	StudentID INT,
    ReviewID INT,
    FOREIGN KEY (ReviewID) REFERENCES ProfessorReview(ReviewID),
	FOREIGN KEY (StudentID) REFERENCES Student(StudentID)    
);

CREATE TABLE CourseReviewRatings (
	ReviewID INT,
    ReviewLiked TINYINT,
    StudentID INT,
    FOREIGN KEY (ReviewID) REFERENCES CourseReview(ReviewID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)  
);

CREATE TABLE ProfessorReviewRatings (
	ReviewID INT,
    ReviewLiked TINYINT,
    StudentID INT,
    FOREIGN KEY (ReviewID) REFERENCES ProfessorReview(ReviewID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)  
);

CREATE TABLE StudentCourseInfo (
	StudentID INT,
    CourseCode VARCHAR(50),
    TookCourse TINYINT,
    Favourited TINYINT,
    ViewLater TINYINT,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)  
);

CREATE TABLE StudentProfessorInfo (
	StudentID INT,
    ProfessorName VARCHAR(255),
    TookCourse TINYINT,
    Favourited TINYINT,
    ViewLater TINYINT,
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)  
);