// routes/artistRoutes.js

const express = require('express');
const router = express.Router();
const { getArtistSongs } = require('../utils/artistSongs');

router.get('/:id/songs', async (req, res) => {
    try {
        const artistId = req.params.id;
        const songs = await getArtistSongs(artistId);
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch artist songs", error: error.toString() });
    }
});

module.exports = router;
