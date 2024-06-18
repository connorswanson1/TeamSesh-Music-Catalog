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
const fetchSongDetails = async (songId, retries = 3) => {
    try {
        const response = await axios.get(`https://api.genius.com/songs/${songId}`, {
            headers: { 'Authorization': `Bearer ${process.env.GENIUS_ACCESS_TOKEN}` }
        });

        const songData = response.data.response.song;

        // Extract the producers' names
        const producers = songData.producer_artists.map(producer => producer.name).join(', ');

        // Extract samples used in the song
        const samples = songData.song_relationships
            .filter(relation => relation.type === "samples")
            .flatMap(relation => relation.songs.map(song => song.title))
            .join(', '); // Adjust based on your needs (e.g., storing as array vs. string)

        return {
            geniusSongId: songId.toString(),
            title: songData.title,
            artist: songData.primary_artist.name,
            album: songData.album ? songData.album.name : null,
            feature: songData.featured_artists.map(artist => artist.name).join(', '),
            samples: samples, // Adjusted to fetch from the song_relationships structure
            release_date: songData.release_date ? new Date(songData.release_date) : null,
            song_art_url: songData.song_art_image_url,
            producer: producers, // Added producer details
            url: songData.url // Added Genius URL
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Song ID ${songId} not found. Skipping...`);
            return null; // Return null if song is not found
        } else if (retries > 0 && error.response && error.response.status === 429) {
            // Wait for a longer period if rate limited
            await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 60 seconds
            return fetchSongDetails(songId, retries - 1);
        } else {
            console.error(`Failed to fetch details for song ID ${songId}:`, error);
            throw error;
        }
    }
};


async function getAllSongDetailsForArtist(artistId) {
    const songIds = await getArtistSongs(artistId);
    const songDetailsPromises = songIds.map(id => fetchSongDetails(id));
    return Promise.all(songDetailsPromises); // Fetch all song details concurrently
}

module.exports = {
    fetchSongDetails, get, getAllSongDetailsForArtist, getArtistSongs
    // export other functions
};
