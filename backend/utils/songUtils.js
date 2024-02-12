// utils/songUtils.js

const { get } = require('../services/geniusClient');

async function getSongDetails(songId) {
    const path = `songs/${songId}`;
    const data = await get(path);
    return data && data.response && data.response.song ? data.response.song : {};
}

module.exports = { getSongDetails };
