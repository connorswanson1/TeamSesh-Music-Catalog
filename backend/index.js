require('dotenv').config();
const express = require('express');
const songRoutes = require('./routes/song.routes');
const artistRoutes = require('./routes/artist.routes');
const app = express();
const cors = require('cors');

const geniusAccessToken = process.env.GENIUS_ACCESS_TOKEN;

const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const connectDB = require('./config/db');

// Connect to the database
connectDB();

app.use(cors());

app.use(express.json()); // Middleware for parsing JSON bodies

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Use the song routes
app.use('/api/songs', songRoutes);

// Use the artist routes - This is where you integrate the artist routes
app.use('/api/artists', artistRoutes);

// Other app.use() for different route prefixes

const port = process.env.PORT || 3001; // Use environment variable or default to 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
