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

/* Get all songs by specified artist */
async function getArtistSongs(artistId, maxSongs = null) {
    let current_page = 1;
    let next_page = true;
    let songs = [];

    while (next_page && (maxSongs == null || songs.length < maxSongs)) {
        const path = `artists/${artistId}/songs`;
        const params = { page: current_page };
        const data = await get(path, params);

        if (data && data.response && data.response.songs && data.response.songs.length > 0) {
            // If maxSongs is specified, calculate remaining songs to fetch
            const remainingSongs = maxSongs != null ? maxSongs - songs.length : data.response.songs.length;
            songs = songs.concat(data.response.songs.slice(0, remainingSongs));

            if (songs.length >= maxSongs) {
                break; // Exit the loop if we've reached the maxSongs limit
            }

            current_page++;
        } else {
            next_page = false;
        }
    }

    return songs.map(song => ({
        id: song.id,
        title: song.title,
        // Add other details you're interested in
    }));
}

/* Get detailed information using Song ID */
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
    getSongDetails, get, getAllSongDetailsForArtist, getArtistSongs
    // export other functions
};
