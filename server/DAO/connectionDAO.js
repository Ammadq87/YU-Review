const mysql = require('mysql');
class connectionDAO {
    connection;
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Ammadq87',
            database: 'YU_Reviews'
        });
    }

    connect(){
        this.connection.connect((err) => {
            if (err) {console.log('Failed to Connect to MySQL Server'); throw err};
            console.log('Connected to Database');
        })
    }

    end() {
        this.connection.end((err) => {
            if (err) {console.log('Failed to Close connection to MySQL Server'); throw err};
            console.log('Connection closed');
        })
    }

    getConnection() {
        return this.connection;
    }

    checkConnection() {
        if (!this.getConnection()) {
            this.connect();
        }
    }
}

module.exports = {connectionDAO};