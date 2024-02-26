// artist.controller.js
const { getArtistSongs } = require('../services/geniusClient');
const { saveSongIds } = require('../services/songService');

async function fetchAndSaveArtistSongIds(artistId) {
    try {
        const songs = await getArtistSongs(artistId, 5); // Fetches song objects, can be limited by including a number of songs to get
        const songIds = songs.map(song => song.id); // Extract just the song IDs
        await saveSongIds(songIds); // Saves those IDs
        console.log('Song IDs fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving song IDs:', error);
    }
}

module.exports = { fetchAndSaveArtistSongIds };
