// controllers/song.controller.js

const geniusClient = require('../services/geniusClient');

async function getSong(req, res) {
    try {
        const songId = req.params.id;
        const songData = await geniusClient.fetchSongById(songId);
        res.json(songData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getSong,
    // other controller exports
};
