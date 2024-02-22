const axios = require('axios');
const BASE_URL = "https://api.genius.com";
const CLIENT_ACCESS_TOKEN = process.env.GENIUS_API_KEY;

axios.defaults.headers.common['Authorization'] = `Bearer ${CLIENT_ACCESS_TOKEN}`;

async function fetchSongDetails(songIds) {
    const songDetailsPromises = songIds.map(id =>
        axios.get(`${BASE_URL}/songs/${id}`).then(response => response.data.response.song)
    );

    // Use Promise.all to wait for all requests to complete
    try {
        const songsDetails = await Promise.all(songDetailsPromises);
        return songsDetails; // This array contains detailed info for each song
    } catch (error) {
        console.error("Error fetching song details:", error);
        throw error;
    }
}
