// models/songId.model.js

const mongoose = require('mongoose');

const songIdSchema = new mongoose.Schema({
    geniusSongId: { type: String, required: true, unique: true },
});

const SongId = mongoose.model('SongId', songIdSchema);

module.exports = SongId;
