const Song = require('../models/song.model');

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).send('Song not found');
        res.json(song);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createSong = async (req, res) => {
    try {
        const newSong = new Song(req.body);
        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateSong = async (req, res) => {
    try {
        const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedSong) return res.status(404).send('Song not found');
        res.json(updatedSong);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteSong = async (req, res) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(req.params.id);
        if (!deletedSong) return res.status(404).send('Song not found');
        res.status(200).send(`Successfully deleted the song with id: ${req.params.id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
