const mongoose = require('mongoose');
const SongId = require('../models/songId.model');

async function saveSongIds(songIds) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const savePromises = songIds.map(songId => {
            return SongId.updateOne(
                { geniusSongId: songId },
                { $setOnInsert: { songId: songId.toString() } },
                { upsert: true }
            );
        });

        await Promise.all(savePromises);
        console.log('Song IDs saved to the database successfully.');
    } catch (error) {
        console.error('Failed to save song IDs to the database:', error);
        throw error;
    }
}

module.exports = { saveSongIds };
