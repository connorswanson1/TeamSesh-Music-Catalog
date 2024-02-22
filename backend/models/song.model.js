// models/song.model.js

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songId: { type: String, required: true, unique: true },
    artistId: { type: String, required: true }, // To associate songs with an artist
    // Add other fields as necessary, like title, producer, releaseDate etc.
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
