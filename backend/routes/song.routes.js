const express = require('express');
const router = express.Router();
const { getSong } = require('../controllers/song.controller');

router.get('/songs/:id/details', async (req, res) => {
    try {
        const songDetails = await getSong(req.params.id);
        res.json(songDetails);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch song details", error: error.toString() });
    }
});

module.exports = router;
