const Song = require('../models/song.model');

// Function to handle a request to get all songs
exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Additional controller functions for creating, updating, and deleting songs
