-- New Script

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

INSERT INTO CourseReview VALUES 
(0, 'LE-EECS-3311-3.00', 1, 'Hadi_Hemmati', 'Ammad', CURDATE()-10, 'Fun course, tough material', 2, 5, 1, 0, 0, 0),
(0, 'LE-EECS-3311-3.00', 6, 'Song_Wang', 'Thanushan', CURDATE()-2, 'Mid Course, Easy stuff', 4, 3, 1, 1, 0, 0),
(0, 'LE-EECS-3311-3.00', 5, 'Song_Wang', 'Akshar', CURDATE()-3, 'I love software design', 2, 2, 0, 0, 0, 0),
(0, 'LE-EECS-3311-3.00', 5, 'Hadi_Hemmati', 'Bryan', CURDATE(), 'i ahte dsa', 5, 1, 0, 1, 0, 0);
SELECT * FROM CourseReview;

INSERT INTO ProfessorReview VALUES 
(0, 'LE-EECS-3311-3.00', 1, 'Hadi_Hemmati', 'Ammad', CURDATE()-10, 'Fun course, tough material', 2, 5, 1, 0, 0, 0),
(0, 'LE-EECS-3311-3.00', 6, 'Song_Wang', 'Thanushan', CURDATE()-2, 'Mid Course, Easy stuff', 4, 3, 1, 1, 0, 0),
(0, 'LE-EECS-3311-3.00', 5, 'Song_Wang', 'Akshar', CURDATE()-3, 'I love software design', 2, 2, 0, 0, 0, 0),
(0, 'LE-EECS-3311-3.00', 2, 'Hadi_Hemmati', 'Bryan', CURDATE(), 'i ahte dsa', 5, 1, 0, 1, 0, 0);
SELECT * FROM ProfessorReview;

SELECT LikeAndDislikeProfessorReview(3,1,1);
SELECT LikeAndDislikeProfessorReview(2,1,1);
SELECT LikeAndDislikeProfessorReview(1,1,0);

SELECT LikeAndDislikeCourseReview(3,1,1);
SELECT LikeAndDislikeCourseReview(2,1,1);
SELECT LikeAndDislikeCourseReview(1,1,0);



