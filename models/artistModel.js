const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: String
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
