const mongoose = require('mongoose');

// Define the song schema
const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    producer: String,
    releaseDate: Date,
});

// Compile and export the model
const Song = mongoose.model('Song', songSchema);
module.exports = Song;
