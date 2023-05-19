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
    getCourseReviews(courseCode) {
        super.checkConnection();
        return new Promise((resolve, reject) => {
            super.getConnection().query(
                `SELECT 
                cr.Username,
                (DATEDIFF(CURDATE(), cr.DatePosted)) as DatePosted,
                cr.Review,
                cr.Easiness,
                cr.Usefulness,
                cr.Liked,
                cr.Retake,
                p.Name as Professor,
                m.Name as Major
                FROM StudentCourseReview scr 
                INNER JOIN CourseReview cr 
                ON scr.ReviewID = cr.ReviewID 
                LEFT JOIN Professor p 
                ON p.ProfessorID = cr.ProfessorID
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


    // ToDo: create functions for professor reviews
}

module.exports = {reviewDAO};