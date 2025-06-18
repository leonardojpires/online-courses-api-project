let con = require('../db');

con.connect(err => {
    if (err) throw err;
    console.log("Connected to the database!");

    const sql = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Users table created successfully!");
        con.end();
    });
});