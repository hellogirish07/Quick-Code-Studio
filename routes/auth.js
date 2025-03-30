const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Corrected path for users.json
const dataFile = path.join(__dirname, '../data/users.json');

// Helper functions
const readData = () => (fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : []);
const writeData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

// Handle Sign-Up
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = readData();

    if (users.some((user) => user.username === username)) {
        return res.status(400).send('Username already exists');
    }

    users.push({ username, password });
    writeData(users);

    res.redirect('/signin.html');
});

// Handle Sign-In
router.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const users = readData();

    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        return res.redirect('/editor.html');
    }

    res.status(400).send('Invalid Username or Password');
});

module.exports = router;
