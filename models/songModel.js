const mongoose = require('mongoose');
const artistSchema = require('./artistModel').schema; // On importe le schéma d'artiste pour pouvoir l'utiliser dans le schéma de chanson

const songSchema = new mongoose.Schema({
    title: String,
    url: String,
    rating: Number,
    artist: artistSchema
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
