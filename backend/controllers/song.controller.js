const { fetchSongDetails } = require('../services/geniusClient.js'); // Adjust the path as needed
const { saveSongDetail } = require('../services/songService'); // Adjust the path as needed
const SongId = require('../models/songId.model'); // Adjust the path as needed

const fetchAndSaveSongDetails = async (testLimit = null) => {
    try {
        const songIds = await SongId.find({}).lean();
        const limitedSongIds = testLimit ? songIds.slice(0, testLimit) : songIds;

        for (const { geniusSongId } of limitedSongIds) {
            const songDetail = await fetchSongDetails(geniusSongId);
            await saveSongDetail(songDetail);

            // Respect rate limits
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
        }

        console.log('Finished processing all song details.');
    } catch (error) {
        console.error('Error fetching and saving song details:', error);
    }
};

// To test, you can call this function directly with a limit, e.g., fetchAndSaveSongDetails(5);
module.exports = { fetchAndSaveSongDetails };
