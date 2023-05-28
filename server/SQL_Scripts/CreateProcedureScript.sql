USE YU_Reviews;

DELIMITER %%
CREATE TRIGGER AddToStudentCourseReview 
AFTER INSERT ON CourseReview
FOR EACH ROW
BEGIN
	INSERT INTO StudentCourseReview (StudentID, ReviewID) VALUES (NEW.StudentID, NEW.ReviewID);
END %%
DELIMITER ;

DELIMITER %%
CREATE TRIGGER AddToStudentProfessorReview 
AFTER INSERT ON ProfessorReview
FOR EACH ROW
BEGIN
	INSERT INTO StudentProfessorReview (StudentID, ReviewID) VALUES (NEW.StudentID, NEW.ReviewID);
END %%
DELIMITER ;