const { connectionDAO } = require('./connectionDAO.js');

class usersDAO extends connectionDAO {
  registerUser(userInfo) {
    super.checkConnection();
    return new Promise((resolve, reject) => {
      super
        .getConnection()
        .query(
          `INSERT INTO Student VALUES (0,?,?,?,?);`,
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
}

module.exports = { usersDAO };
