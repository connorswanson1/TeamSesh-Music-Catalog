const { get } = require('../services/geniusClient');

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

module.exports = { getArtistSongs };
