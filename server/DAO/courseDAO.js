const {connectionDAO} = require('./connectionDAO.js');
class courseDAO extends connectionDAO{
    getAllCourses() {
        if (!super.getConnection()) {
            super.connect();
        }

        return new Promise((resolve, reject) => {
            super.getConnection().query('SELECT * FROM Course;',
                (err, results) => {
                    if (err) 
                        reject(err);
                    resolve(results);
                }
            )
        });
    }

    getCourseByCode(code) {
        if (!super.getConnection()) {
            super.connect();
        }

        return new Promise((resolve, reject) => {
            super.getConnection().query('SELECT * FROM CourseReview WHERE CourseCode=?',
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
     * Retrieves all the course information + review statistics
     * @param {number} code 
     * @returns 
     */
    getCourseInformation(code) {
        if (!super.getConnection()) {
            super.connect();
        }

        return new Promise((resolve, reject) => {
            super.getConnection().query(`
            select
                c.*,
                sum(cr.Liked = 1) / count(*) * 100 as LikedPercentage,
                sum(cr.Retake = 1) / count(*) * 100 as RetakePercentage,
                avg(cr.Easiness) as Easiness,
                avg(cr.Usefulness) as Usefulness
            from CourseReview cr
            inner join Course c 
            on c.CourseCode = cr.CourseCode
            where cr.CourseCode=?`,
                [code],
                (err, results) => {
                    if (err) 
                        reject(err);
                    resolve(results);
                }
            )
        });
    }

    getProfessorsTeachingCourse(code) {
        if (!super.getConnection()) {
            super.connect();
        }

        return new Promise((resolve, reject) => {
            super.getConnection().query('SELECT * FROM CoursesTaught WHERE CourseCode=?',
                [code],
                (err, results) => {
                    if (err) 
                        reject(err);
                    resolve(results);
                }
            )
        });
    }
}

module.exports = {courseDAO};