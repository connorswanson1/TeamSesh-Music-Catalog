// artist.controller.js
const { getArtistSongs } = require('../services/geniusClient');
const { saveSongIds } = require('../services/songService');

async function fetchAndSaveArtistSongIds(artistId) {
    try {
        const songs = await getArtistSongs(artistId); // Fetches song objects
        const songIds = songs.map(song => song.id); // Extract just the song IDs
        await saveSongIds(songIds, artistId); // Saves those IDs
        console.log('Song IDs fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving song IDs:', error);
    }
}

module.exports = { fetchAndSaveArtistSongIds };
