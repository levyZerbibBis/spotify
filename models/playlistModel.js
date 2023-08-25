const mongoose = require('mongoose');
const songSchema = require('./songModel').schema; // On importe le schéma de chanson
const userSchema = require('./userModel').schema; // On importe le schéma d'utilisateur

const playlistSchema = new mongoose.Schema({
    name: String,
    songs: [songSchema],
    user: userSchema
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
