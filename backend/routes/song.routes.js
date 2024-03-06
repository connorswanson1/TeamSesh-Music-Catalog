const express = require('express');
const router = express.Router();
const { fetchAndSaveSongDetails } = require('../controllers/song.controller');
const SongDetail = require('../models/songDetail.model');

// Route to trigger fetching and saving song details
router.get('/fetch-details', async (req, res) => {
    try {
        // You can pass a query parameter to limit the number of songs processed for testing
        const testLimit = req.query.limit ? parseInt(req.query.limit, 10) : null;

        await fetchAndSaveSongDetails(testLimit);

        res.status(200).send('Song details fetching and saving process initiated successfully.');
    } catch (error) {
        console.error('Error in route /fetch-details:', error);
        res.status(500).send('Error initiating song details fetching and saving process.');
    }
});

// New route to get song details
router.get('/details', async (req, res) => {
    try {
        const songs = await SongDetail.find({}); // Adjust query as needed
        res.json(songs);
    } catch (error) {
        console.error('Failed to get song details:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
