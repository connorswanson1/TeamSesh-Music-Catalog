const mongoose = require('mongoose');

const songDetailSchema = new mongoose.Schema({
    geniusSongId: { type: String, required: true, unique: true }, // Ensure consistency in ID naming
    title: { type: String, required: true },
    artist: String,
    producer: String,
    album: String,
    feature: String,
    samples: String,
    release_date: Date,
    song_art_url: String,
    url: String,
});

const SongDetail = mongoose.model('SongDetail', songDetailSchema);

module.exports = SongDetail;
