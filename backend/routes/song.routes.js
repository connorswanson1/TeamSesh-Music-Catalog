const express = require('express');
const router = express.Router();
const { getSongDetails } = require('../utils/songUtils');

router.get('/songs/:id/details', async (req, res) => {
    try {
        const songDetails = await getSongDetails(req.params.id);
        res.json(songDetails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch song details", error: error.toString() });
    }
});

module.exports = router;
