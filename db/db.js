const mysql = require('mysql2');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "online_course_project"
});

module.exports = con;