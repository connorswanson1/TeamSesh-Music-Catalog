// utils/artistSongs.js

const { get } = require('../services/geniusClient');

async function getArtistSongs(artistId) {
    let current_page = 1;
    let next_page = true;
    let songs = [];

    while (next_page) {
        const path = `artists/${artistId}/songs`;
        const params = { page: current_page };
        const data = await get(path, params);

        if (data && data.response && data.response.songs && data.response.songs.length > 0) {
            songs = songs.concat(data.response.songs);
            current_page++;
        } else {
            next_page = false;
        }
    }

    return songs.map(song => ({
        id: song.id,
        title: song.title,
    }));
}

module.exports = { getArtistSongs };
