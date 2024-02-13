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

async function fetchSongById(songId) {
    try {
        const response = await axiosInstance.get(`/songs/${songId}`);
        return response.data.response.song;
    } catch (error) {
        throw error;
    }
}

// Add more functions for other types of requests like search, artist info, etc.

module.exports = {
    fetchSongById, get
    // export other functions
};
