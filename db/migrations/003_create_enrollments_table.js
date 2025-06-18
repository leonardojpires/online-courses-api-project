let con = require('../db');

con.connect(err => {
    if (err) throw err;
    console.log("Connected to the database!");

    const sql = "CREATE TABLE IF NOT EXISTS enrollments (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, course_id INT NOT NULL, enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE)";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Enrollments table created successfully!");
        con.end();
    });
});