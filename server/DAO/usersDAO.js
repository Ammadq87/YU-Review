const { connectionDAO } = require('./connectionDAO.js');

class usersDAO extends connectionDAO {
  registerUser(userInfo) {
    super.checkConnection();
    return new Promise((resolve, reject) => {
      super
        .getConnection()
        .query(
          `INSERT INTO Student 
          (StudentID, FirstName, LastName, Email, Password)
           VALUES (0,?,?,?,?);`,
          [
            userInfo.FirstName,
            userInfo.LastName,
            userInfo.Email,
            userInfo.Password,
          ],
          (err) => {
            if (err) reject('Email is already in use');
            resolve('Successfully Registered');
          }
        );
    });
  }

  loginUser(userInfo) {
    super.checkConnection();
    return new Promise((resolve, reject) => {
      super
        .getConnection()
        .query(
          `SELECT *
          FROM Student
          WHERE Email=? AND Password=?`,
          [
            userInfo.Email,
            userInfo.Password,
          ],
          (err, results) => {
            if (err) reject('Invalid Credentials');
            if (results == null || results.length === 0)
              reject('Invalid Credentials');
            resolve(JSON.stringify(results[0]));
          }
        );
    });
  }

}

module.exports = { usersDAO };
