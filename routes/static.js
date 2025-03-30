const express = require('express');
const path = require('path');
const router = express.Router();

// Serve HTML pages
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../views/index.html')));
router.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, '../views/signup.html')));
router.get('/signin.html', (req, res) => res.sendFile(path.join(__dirname, '../views/signin.html')));
router.get('/editor.html', (req, res) => res.sendFile(path.join(__dirname, '../views/editor.html')));

module.exports = router;
