USE YU_Reviews;

DELIMITER %%
CREATE FUNCTION LikeAndDislikeCourseReview (sID INT, rID INT, isUpVote TINYINT) RETURNS TINYINT DETERMINISTIC
BEGIN
	DECLARE alreadyVoted INT;
    DECLARE currNumOfLikes INT;
    DECLARE currNumOfDislikes INT;
    
    SET alreadyVoted = (SELECT COUNT(*) FROM CourseReviewRatings WHERE StudentID=sID AND ReviewID=rID);
    SET currNumOfLikes = (SELECT Likes FROM CourseReview WHERE ReviewID=rID);
    SET currNumOfDislikes = (SELECT Dislikes FROM CourseReview WHERE ReviewID=rID);
    
    IF alreadyVoted >= 1 THEN
		IF isUpVote = 1 AND currNumOfLikes > 0 THEN
			UPDATE CourseReview SET Likes = Likes-1 WHERE ReviewID=rID;
		ELSEIF isUpVote = 0 AND currNumOfDislikes > 0 THEN
			UPDATE CourseReview SET Dislikes = Dislikes-1 WHERE ReviewID=rID;
		END IF;
		DELETE FROM CourseReviewRatings WHERE ReviewID=rID AND StudentID=sID;
	ELSE 
		IF isUpVote = 1 THEN
			UPDATE CourseReview SET Likes = Likes+1 WHERE ReviewID=rID;
            INSERT INTO CourseReviewRatings VALUES (rID, 1, 0, sID);
		ELSEIF isUpVote = 0 THEN
			UPDATE CourseReview SET Dislikes = Dislikes+1 WHERE ReviewID=rID;
            INSERT INTO CourseReviewRatings VALUES (rID, 0, 1, sID);
		END IF;
	END IF;
    RETURN 1;
END %%
DELIMITER ;

DELIMITER %%
CREATE FUNCTION LikeAndDislikeProfessorReview (sID INT, rID INT, isUpVote TINYINT) RETURNS TINYINT DETERMINISTIC
BEGIN
	DECLARE alreadyVoted INT;
    DECLARE currNumOfLikes INT;
    DECLARE currNumOfDislikes INT;
    
    SET alreadyVoted = (SELECT COUNT(*) FROM ProfessorReviewRatings WHERE StudentID=sID AND ReviewID=rID);
    SET currNumOfLikes = (SELECT Likes FROM ProfessorReview WHERE ReviewID=rID);
    SET currNumOfDislikes = (SELECT Dislikes FROM ProfessorReview WHERE ReviewID=rID);
    
    IF alreadyVoted >= 1 THEN
		IF isUpVote = 1 AND currNumOfLikes > 0 THEN
			UPDATE ProfessorReview SET Likes = Likes-1 WHERE ReviewID=rID;
		ELSEIF isUpVote = 0 AND currNumOfDislikes > 0 THEN
			UPDATE ProfessorReview SET Dislikes = Dislikes-1 WHERE ReviewID=rID;
		END IF;
		DELETE FROM ProfessorReviewRatings WHERE ReviewID=rID AND StudentID=sID;
	ELSE 
		IF isUpVote = 1 THEN
			UPDATE ProfessorReview SET Likes = Likes+1 WHERE ReviewID=rID;
            INSERT INTO ProfessorReviewRatings VALUES (rID, 1, 0, sID);
		ELSEIF isUpVote = 0 THEN
			UPDATE ProfessorReview SET Dislikes = Dislikes+1 WHERE ReviewID=rID;
            INSERT INTO ProfessorReviewRatings VALUES (rID, 0, 1, sID);
		END IF;
	END IF;
    RETURN 1;
END %%
DELIMITER ;
