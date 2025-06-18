let con = require('../db');

con.connect(err => {
    if (err) throw err;
    console.log("Connected to the database!");

    const sql = "CREATE TABLE IF NOT EXISTS courses (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, description TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Courses table created successfully!");
        con.end();
    });
});