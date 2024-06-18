const { fetchSongDetails } = require('../services/geniusClient.js');
const { saveSongDetail } = require('../services/songService');
const SongId = require('../models/songId.model');

const fetchAndSaveSongDetails = async (testLimit = null, batchSize = 5, delay = 10000) => {
    try {
        const songIds = await SongId.find({}).lean();
        const limitedSongIds = testLimit ? songIds.slice(0, testLimit) : songIds;

        for (let i = 0; i < limitedSongIds.length; i += batchSize) {
            const batch = limitedSongIds.slice(i, i + batchSize);

            await Promise.all(batch.map(async ({ geniusSongId }) => {
                const songDetail = await fetchSongDetails(geniusSongId);
                if (songDetail) {
                    await saveSongDetail(songDetail);
                }
            }));

            // Respect rate limits by adding a delay between batches
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        console.log('Finished processing all song details.');
    } catch (error) {
        console.error('Error fetching and saving song details:', error);
    }
};

module.exports = { fetchAndSaveSongDetails };
