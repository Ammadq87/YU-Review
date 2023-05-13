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
                `SELECT * 
                FROM StudentCourseReview scr 
                INNER JOIN CourseReview cr 
                ON scr.ReviewID = cr.ReviewID 
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