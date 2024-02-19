const axios = require('axios');
const geniusApiKey = process.env.GENIUS_ACCESS_TOKEN; // Loaded from .env

const BASE_URL = 'https://api.genius.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${geniusApiKey}` },
});

async function get(path, params = {}) {
    try {
        const response = await axiosInstance.get(path, { params });
        return response.data;
    } catch (error) {
        console.error("Error making request to Genius API: ", error);
        throw error;
    }
}

async function getSongDetails(songId) {
    try {
        const response = await axiosInstance.get(`/songs/${songId}`);
        const songDetails = response.data.response.song;
        // Extract and return only the needed details
        return {
            id: songDetails.id,
            title: songDetails.title,
            producers: songDetails.producer_artists.map(artist => artist.name).join(', '),
            releaseDate: songDetails.release_date_for_display,
            // Add more details as needed
        };
    } catch (error) {
        console.error("Error fetching song details:", error);
        throw error;
    }
}

async function getAllSongDetailsForArtist(artistId) {
    const songIds = await getArtistSongs(artistId);
    const songDetailsPromises = songIds.map(id => getSongDetails(id));
    return Promise.all(songDetailsPromises); // Fetch all song details concurrently
}

module.exports = {
    getSongDetails, get, getAllSongDetailsForArtist
    // export other functions
};
