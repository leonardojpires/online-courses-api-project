let con = require('./db.js');

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");

    const query = "CREATE DATABASE IF NOT EXISTS online_course_project";
    con.query(query, (err, result) => {
        if (err) throw err;
        console.log("Database created successfully!");
        con.end();
    });
});