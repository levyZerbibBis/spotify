const express = require('express');
const SongController = require('./songController');

const router = express.Router();

router.get('/songs', SongController.getAllSongs);
router.get('/songs/:id', SongController.getSongById);
router.post('/songs', SongController.createSong);
router.put('/songs/:id', SongController.updateSong);
router.delete('/songs/:id', SongController.deleteSong);

module.exports = router;