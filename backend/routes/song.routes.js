const express = require('express');
const router = express.Router();
const { fetchAndSaveSongDetails } = require('../controllers/song.controller');
const { saveSongIds } = require('../services/songService');
const { getArtistSongs } = require('../services/geniusClient');
const SongDetail = require('../models/songDetail.model');

// Route to fetch new song IDs and save them
router.get('/fetch-new-song-ids/:artistId', async (req, res) => {
    try {
        const artistId = req.params.artistId;
        const songs = await getArtistSongs(artistId);
        const songIds = songs.map(song => song.id);
        await saveSongIds(songIds);

        res.status(200).send('New song IDs fetched and saved successfully.');
    } catch (error) {
        console.error('Error in route /fetch-new-song-ids:', error);
        res.status(500).send('Error fetching and saving new song IDs.');
    }
});

// Existing route to fetch and save song details
router.get('/fetch-details', async (req, res) => {
    try {
        const testLimit = req.query.limit ? parseInt(req.query.limit, 10) : null;
        await fetchAndSaveSongDetails(testLimit);

        res.status(200).send('Song details fetching and saving process initiated successfully.');
    } catch (error) {
        console.error('Error in route /fetch-details:', error);
        res.status(500).send('Error initiating song details fetching and saving process.');
    }
});

// Route to get song details, excluding those with "unknown" release dates
router.get('/details', async (req, res) => {
    try {
        const songs = await SongDetail.find({ release_date: { $ne: null } }); // Exclude songs with null release dates
        res.json(songs);
    } catch (error) {
        console.error('Failed to get song details:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get the count of songs
router.get('/count', async (req, res) => {
    try {
        const songCount = await SongDetail.countDocuments();
        res.json({ count: songCount });
    } catch (error) {
        console.error('Failed to get song count:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
