// backend/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the connectDB function
require('dotenv').config(); // To use environment variables from .env file

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define your routes here
app.use('/api/artists', require('./routes/artist.routes')); // Linking artist routes
app.use('/api/songs', require('./routes/song.routes')); // Linking song routes

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../teamsesh-music-catalog-app/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../teamsesh-music-catalog-app/build/index.html'));
});

// Set the port and start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
