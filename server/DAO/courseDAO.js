const {connectionDAO} = require('./connectionDAO.js');
class courseDAO extends connectionDAO{
    getAllCourses() {
        // ToDo - Replace with API call from: https://yorkapi.isaackogan.com/docs/
    }

    getCourseByCode(code) {
        // ToDo - Replace with API call from: https://yorkapi.isaackogan.com/docs/
    }

    /**
     * Retrieves all the course information + review statistics
     * @param {number} code 
     * @returns 
     * @deprecated information not available
     */
    getCourseInformation(code) {
        if (!super.getConnection()) {
            super.connect();
        }

        return new Promise((resolve, reject) => {
            super.getConnection().query(`
                SELECT 
                c.*, 
                sum(cr.Liked = 1) / count(*) * 100 as LikedPercentage,
                sum(cr.Retake = 1) / count(*) * 100 as RetakePercentage,
                avg(cr.Easiness) as Easiness,
                avg(cr.Usefulness) as Usefulness 
                FROM Course c
                LEFT JOIN CourseReview cr
                ON c.CourseCode=cr.CourseCode
                WHERE c.CourseCode=?;`,
                [code],
                (err, results) => {
                    if (err) 
                        reject(err);
                    resolve(results);
                }
            )
        });
    }

    /**
     * 
     * @param {*} code 
     * @returns 
     */
    getProfessorsTeachingCourse(code) {
        // ToDo - Replace with API call from: https://yorkapi.isaackogan.com/docs/
    }
}

module.exports = {courseDAO};