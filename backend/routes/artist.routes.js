// artist.routes.js
const express = require('express');
const router = express.Router();
const { fetchAndSaveArtistSongIds } = require('../controllers/artist.controller');

router.get('/:id/save-song-ids', async (req, res) => {
    try {
        await fetchAndSaveArtistSongIds(req.params.id)
            .then(() => console.log('Finished processing all song IDs.'))
            .catch(error => console.error('An error occurred:', error));
        res.send('Song IDs are being fetched and saved.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
