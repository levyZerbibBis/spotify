const express = require('express');
const PlaylistController = require('./playlistController');

const router = express.Router();

router.get('/playlists', PlaylistController.getAllPlaylists);
router.get('/playlists/:id', PlaylistController.getPlaylistById);
router.post('/playlists', PlaylistController.createPlaylist);
router.put('/playlists/:id', PlaylistController.updatePlaylist);
router.delete('/playlists/:id', PlaylistController.deletePlaylist);

module.exports = router;