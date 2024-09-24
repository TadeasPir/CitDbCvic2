const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = mysql.createConnection({ /* your db connection here */ });

// Fetch all posts
router.get('/posts', (req, res) => {
    const query = 'SELECT * FROM posts ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// Add a new post
router.post('/add-post', (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
    db.query(query, [title, content], (err, result) => {
        if (err) {
            console.error('Error inserting post:', err);
            res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Post added successfully' });
    });
});

module.exports = router;