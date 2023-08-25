const express = require('express');
const ArtistController = require('./artistController');

const router = express.Router();

router.get('/artists', ArtistController.getAllArtists);
router.get('/artists/:id', ArtistController.getArtistById);
router.post('/artists', ArtistController.createArtist);
router.put('/artists/:id', ArtistController.updateArtist);
router.delete('/artists/:id', ArtistController.deleteArtist);

module.exports = router;
