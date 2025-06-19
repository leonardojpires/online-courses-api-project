let express = require('express');
let app = express();
let con = require('./db/db');

// Middleware to parse JSON bodies
app.use(express.json());

/* Routes */
// -- USERS --
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';

    con.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';

    con.query(query, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(400).send('User not found!');
        res.json(result[0]);
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';

    con.query(query, [name, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, name, email });
    });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';

    con.query(query, [ name, email, userId ], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('User not found!');
        res.status(200).json({ 
            message: 'User updated successfully!',
            user: {  userId, name, email }
        });
    });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';

    con.query(query, [userId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('User not found!');
        res.status(200).json({ 
            message: 'User deleted successfully!',
        });
    });
});

// -- COURSES --
app.get('/courses', (req, res) => {
    const query = 'SELECT * FROM courses';

    con.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.get('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const query = 'SELECT * FROM courses WHERE id = ?';

    con.query(query, [courseId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(400).send('Course not found!');
        res.json(result[0]);
    });
});

app.post('/courses', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO courses (title, description) VALUES (?, ?)';

    con.query(query, [title, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, title, description });
    });
});

app.put('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const { title, description } = req.body;
    const query = 'UPDATE courses SET title = ?, description = ? WHERE id = ?';

    con.query(query, [ title, description, courseId ], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('Course not found!');
        res.status(200).json({ 
            message: 'Course updated successfully!',
            user: {  courseId, title, description }
        });
    });
});

app.delete('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const query = 'DELETE FROM courses WHERE id = ?';

    con.query(query, [courseId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('Course not found!');
        res.status(200).json({ 
            message: 'Course deleted successfully!',
        });
    });
});

// -- ENROLLMENTS --
app.get('/enrollments', (req, res) => {
    const query = `
        SELECT e.id, u.name AS user_name, c.title AS course_title, e.enrolled_at
        FROM enrollments e
        JOIN users u ON e.user_id = u.id
        JOIN courses c ON e.course_id = c.id
    `;

    con.query(query, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

/* app.get('/courses/:id', (req, res) => {
    const courseId = req.params.id;
    const query = 'SELECT * FROM courses WHERE id = ?';

    con.query(query, [courseId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(400).send('Course not found!');
        res.json(result[0]);
    });
}); */

app.post('/enrollments', (req, res) => {
    const { user_id, course_id } = req.body;
    const query = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';

    con.query(query, [user_id, course_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, user_id, course_id });
    });
});

app.put('/enrollments/:id', (req, res) => {
    const enrollmentId = req.params.id;
    const { user_id, course_id } = req.body;
    const query = 'UPDATE enrollments SET user_id = ?, course_id = ? WHERE id = ?';

    con.query(query, [ user_id, course_id, enrollmentId ], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('Enrollment not found!');
        res.status(200).json({ 
            message: 'Enrollment updated successfully!',
            user: {  enrollmentId, user_id, course_id }
        });
    });
});

app.delete('/enrollments/:id', (req, res) => {
    const enrollmentId = req.params.id;
    const query = 'DELETE FROM enrollments WHERE id = ?';

    con.query(query, [enrollmentId], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).send('Enrollment not found!');
        res.status(200).json({ 
            message: 'Enrollment deleted successfully!',
        });
    });
});

let server = app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});