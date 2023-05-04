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
            super.getConnection().query('SELECT * FROM Course WHERE CourseCode=?',
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