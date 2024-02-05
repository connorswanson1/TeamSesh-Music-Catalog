const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');

// Route to get a list of all songs
router.get('/', songController.getAllSongs);

// Route to get a single song by id
router.get('/:id', songController.getSongById);

// Route to add a new song
router.post('/', songController.createSong);

// Route to update a song by id
router.put('/:id', songController.updateSong);

// Route to delete a song by id
router.delete('/:id', songController.deleteSong);

module.exports = router;
