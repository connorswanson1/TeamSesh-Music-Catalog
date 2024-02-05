const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    producer: String,
    releaseDate: Date,
    // Add any additional fields here
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
