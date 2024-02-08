// routes/song.routes.js

const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');

router.get('/:id', songController.getSong); // Route for getting song data from Genius

module.exports = router;
