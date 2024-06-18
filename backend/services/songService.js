const { mongoose } = require('../config/db'); // Import the shared mongoose instance
const SongId = require('../models/songId.model');
const SongDetail = require('../models/songDetail.model');

async function saveSongIds(songIds) {
    try {
        const existingSongIds = await SongId.find({}).lean().select('geniusSongId');

        const existingSongIdSet = new Set(existingSongIds.map(song => song.geniusSongId.toString()));

        const newSongIds = songIds.filter(songId => !existingSongIdSet.has(songId.toString()));

        const savePromises = newSongIds.map(songId => {
            return SongId.updateOne(
                { geniusSongId: songId },
                { $setOnInsert: { songId: songId.toString() } },
                { upsert: true }
            );
        });

        await Promise.all(savePromises);
        console.log('New song IDs saved to the database successfully.');
    } catch (error) {
        console.error('Failed to save song IDs to the database:', error);
        throw error;
    }
}

const saveSongDetail = async (songDetail) => {
    try {
        const existingSong = await SongDetail.findOne({ geniusSongId: songDetail.geniusSongId });

        if (existingSong) {
            // If the song already exists, update it with the new details
            await SongDetail.updateOne({ geniusSongId: songDetail.geniusSongId }, { $set: songDetail });
            console.log(`Updated details for song ID: ${songDetail.geniusSongId}`);
        } else {
            // If the song does not exist, insert it as a new record
            const detail = new SongDetail(songDetail);
            await detail.save();
            console.log(`Saved details for song ID: ${songDetail.geniusSongId}`);
        }
    } catch (error) {
        console.error('Error saving song detail:', error);
        throw error;
    }
};

module.exports = { saveSongIds, saveSongDetail };
