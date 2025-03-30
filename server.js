const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from "public" and "views" folders
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/Img', express.static(path.join(__dirname, 'Img')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Route handling
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send('404: Page Not Found');
});

// Start server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
