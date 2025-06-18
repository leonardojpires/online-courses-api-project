let con = require('../db');

con.connect(err => {
    if (err) throw err;
    console.log("Connected to the database!");

    const sql = "ALTER TABLE enrollments ADD UNIQUE(user_id, course_id)";
    con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Unique constraint added to enrollments table successfully!");
        con.end();
    });
});