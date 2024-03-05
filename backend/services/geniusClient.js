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
async function getArtistSongs(artistId) {
    let current_page = 1;
    let next_page = true;
    let songs = [];

    while (next_page) {
        console.log(`Fetching page ${current_page} for artist ID ${artistId}`);

        const path = `artists/${artistId}/songs`;
        const params = { page: current_page };
        const data = await get(path, params);

        if (data && data.response && data.response.songs && data.response.songs.length > 0) {
            songs = songs.concat(data.response.songs);
            console.log(`Fetched ${data.response.songs.length} songs, total collected: ${songs.length}`);

            // Assuming the API includes a field or indicator for more pages. Adjust as necessary.
            next_page = !!data.response.next_page;
            current_page++;
        } else {
            next_page = false; // Stop if no songs found in the response
            console.log('No songs found or end of data reached');
        }
    }

    return songs.map(song => ({
        id: song.id,
        title: song.title,
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
