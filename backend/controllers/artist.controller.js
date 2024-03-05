// artist.controller.js
const { getArtistSongs } = require('../services/geniusClient');
const { saveSongIds } = require('../services/songService');

async function fetchAndSaveArtistSongIds(artistId) {
    try {
        // Fetches song objects, can be limited by including a number
        const allSongs = await getArtistSongs(artistId); // Removed the limit of 5 for full fetching
        const batchSize = 10; // Define the size of each batch
        const rateLimitWaitTime = 10000; // Time to wait in ms to respect rate limits, adjust as needed

        for (let i = 0; i < allSongs.length; i += batchSize) {
            // Extract just the song IDs for the current batch
            const songIdsBatch = allSongs.slice(i, i + batchSize).map(song => song.id);
            // Saves those IDs in a batch 
            await saveSongIds(songIdsBatch);

            // Log the progress
            console.log(`Batch ${i / batchSize + 1}/${Math.ceil(allSongs.length / batchSize)} processed.`); // allSongs.length is onlt returning as 20

            // Wait to respect API rate limits if there are more batches to process
            if (i + batchSize < allSongs.length) {
                console.log('Waiting to respect API rate limits...');
                await new Promise(resolve => setTimeout(resolve, rateLimitWaitTime));
            }
        }

        console.log('All song IDs fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving song IDs:', error);
    }
}

module.exports = { fetchAndSaveArtistSongIds };
