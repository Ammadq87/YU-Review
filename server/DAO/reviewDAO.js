const { connectionDAO } = require("./connectionDAO");

class reviewDAO extends connectionDAO {

    /**
     * Retrieves all course reviews from database
     * @returns 
     */
    getAllCourseReviews() {
        super.checkConnection();
        console.log('hi')
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                `SELECT * 
                FROM StudentCourseReview scr 
                INNER JOIN CourseReview cr 
                ON scr.ReviewID = cr.ReviewID;`, 
                
                (err, results) => {
                    if (err)
                        reject(err);
                    resolve(results);
                }
            )
        });
    }

    /**
     * Retrieves all reviews for a specified course
     * @param {string} courseCode 
     * @returns 
     */
    getCourseReviewsByCode(courseCode) {
        super.checkConnection();
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                `SELECT 
                scr.ReviewID,
                scr.StudentID,
                cr.CourseCode,
                (DATEDIFF(CURDATE(), cr.DatePosted)) as DatePosted,
                cr.Easiness,
                cr.Usefulness,
                cr.Liked,
                cr.Retake,
                cr.Likes,
                cr.Dislikes,
                cr.ProfessorName,
                cr.Username,
                cr.Review
                FROM StudentCourseReview scr
                INNER JOIN CourseReview cr
                ON cr.ReviewID = scr.ReviewID
                LEFT JOIN Student s
                ON cr.StudentID = s.StudentID
                LEFT JOIN Major m
                ON s.MajorID = m.MajorID
                WHERE cr.CourseCode=?;`, 
                [courseCode],
                (err, results) => {
                    if (err)
                        reject(err);
                    resolve(results);
                }
            )
        });
    }

    getProfessorReviews(name) {
        super.checkConnection();
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                `SELECT 
                spr.StudentID,
                spr.ReviewID,
                pr.CourseCode,
                pr.ProfessorName,
                pr.Username,
                (DATEDIFF(CURDATE(), pr.DatePosted)) as DatePosted,
                pr.Review,
                pr.Engaging,
                pr.Clarity,
                pr.Liked,
                pr.Retake,
                pr.Likes,
                pr.Dislikes
                FROM StudentProfessorReview spr
                INNER JOIN ProfessorReview pr
                ON spr.ReviewID = pr.ReviewID
                WHERE pr.ProfessorName=?;`, 
                [name],
                (err, results) => {
                    if (err)
                        reject(err);
                    resolve(results);
                }
            )
        });
    }


    voteCourseReview(sID, rID, vote) {
        try {
            super.checkConnection();
            super.getConnection().query(
                `SELECT LikeAndDisklikeCourseReview(?,?,?)`, 
                [rID, sID, vote],
                (results, err) => {
                    if (err) console.log(err);
                }
            )
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = {reviewDAO};