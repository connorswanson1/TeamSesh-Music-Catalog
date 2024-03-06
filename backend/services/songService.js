const { mongoose } = require('../config/db'); // Import the shared mongoose instance
const SongId = require('../models/songId.model');
const SongDetail = require('../models/songDetail.model');

async function saveSongIds(songIds) {
    try {
        //await mongoose.connect(process.env.MONGO_URI);
        // Connection not needed here, handled at start up
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

const saveSongDetail = async (songDetail) => {
    try {
        const detail = new SongDetail(songDetail);
        await detail.save();
        console.log(`Saved details for song ID: ${songDetail.geniusSongId}`);
    } catch (error) {
        console.error('Error saving song detail:', error);
        throw error;
    }
};

module.exports = { saveSongIds, saveSongDetail };
