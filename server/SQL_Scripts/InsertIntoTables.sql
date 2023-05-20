USE YU_Reviews;

INSERT INTO Major VALUES 
(0, 'Computer Science'), 
(0, 'Math'),
(0, 'Accounting'),
(0, 'Dentistry');
SELECT * FROM Major;

INSERT INTO Student VALUES 
(0, 'Ammad', 'Qureshi', 'ammadq3@gmail.com', '1', 'CS @ YU', 1),
(0, 'Bryan', 'Zhang', 'bryanz@gmail.com', '1', 'Math @ UW', 2),
(0, 'Haazim', 'Siddiqui', 'haazims@gmail.com', '1', 'Acc @ UW', 3),
(0, 'Jathushan', 'Karunamoorthy', 'jk@gmail.com', '1', 'BIO @ GU', 4),
(0, 'Akshar', 'Patel', 'aksharp@gmail.com', '1', 'CS @ WLU', 1), 
(0, 'Thanushan', 'Pirapakaran', 'thanup@gmail.com', '1', 'CS @ BU', 1);
SELECT * FROM Student;

INSERT INTO Course VALUES 
('EECS3311', 'Software Design', 'Learn about the software development process'),
('EECS3101', 'Algorithmic Design', 'Advanced DSA'),
('ECON1010', 'Intro. to Macroeconomics', 'A step ahead from Microeconomics'),
('MATH2030', 'Elementary Probability', 'Learn about Stats'),
('BIOL1000', 'Intro. to Biology', 'Highschool review of Biology');
SELECT * FROM Course;

INSERT INTO Professor VALUES 
(0, 'Song Wang', 'songw@yorku.ca'),
(0, 'Hadi Hemmatti', 'hadim@yorku.ca'),
(0, 'Amenda Chow', 'amendac@yorku.ca'),
(0, 'Robert McKeown', 'robm@yorku.ca'),
(0, 'Banafaseh Pour', 'bana@yorku.ca');
SELECT * FROM Professor;

INSERT INTO CoursesTaught VALUES 
('EECS3311', 1),
('EECS3311', 2),
('EECS3101', 2),
('ECON1010', 4),
('MATH2030', 3),
('BIOL1000', 5);
SELECT * FROM CoursesTaught;

INSERT INTO StudentTakesCourse VALUES 
(1, 'EECS3311'),
(5, 'EECS3101'),
(5, 'EECS3311'),
(6, 'EECS3311'),
(6, 'EECS3101'),
(2, 'EECS3101'),
(2, 'MATH2030'),
(4, 'BIOL1000'),
(3, 'ECON1010');
SELECT * FROM StudentTakesCourse;

SELECT * FROM Student;

DELIMITER %%
CREATE TRIGGER AddToStudentCourseReview 
AFTER INSERT ON CourseReview
FOR EACH ROW
BEGIN
	INSERT INTO StudentCourseReview (StudentID, ReviewID) VALUES (NEW.StudentID, NEW.ReviewID);
END %%
DELIMITER ;

INSERT INTO CourseReview VALUES 
(0, 'EECS3311', 1, 2, 'Ammad', CURDATE(), 'Fun course, tough material', 2, 5, 1, 0),
(0, 'EECS3311', 6, 2, 'Thanushan', CURDATE(), 'Mid Course, Easy stuff', 4, 3, 1, 1),
(0, 'EECS3311', 5, 1, 'Akshar', CURDATE(), 'I love software design', 2, 2, 0, 0),
(0, 'EECS3101', 5, 2, 'Akshar', CURDATE(), 'i ahte dsa', 5, 1, 0, 1);
SELECT * FROM CourseReview;

SELECT * FROM Course;

SELECT * FROM ProfessorReview;
SELECT * FROM Professor;

DELETE FROM ProfessorReview;
INSERT INTO ProfessorReview VALUES
-- (0, 'EECS3311', 1, 2, 'Ammad', CURDATE()-1, 'Very caring prof. Loves teaching this course, but his labes are sometimes confusing', 3, 3, 1,0),
-- (0, 'EECS3311', 1, 2, 'Thanushan', CURDATE(), 'Easy-going prof. Course content is kinda tough, but better than Song Wang', 4, 3, 1,1);
(0, 'EECS3101', 1, 1, 'Akshar', CURDATE()-100, 'Shit prof', 1, 2, 0,0)
;