const mongoose = require('mongoose');
const Song = require('../models/song.model');

async function saveSongIds(songIds, artistId) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const savePromises = songIds.map(songId => {
            return Song.updateOne(
                { songId: songId, artistId: artistId },
                { $setOnInsert: { songId: songId.toString(), artistId: artistId } },
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
