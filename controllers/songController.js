const Song = require('./songModel');
const jwt = require('jwt-simple');
const config = require('./config');

const SongController = {

    // Récupérer toutes les chansons
    async getAllSongs(req, res) {
        try {
            const songs = await Song.find();
            res.json(songs);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des chansons" });
        }
    },

    // Récupérer une chanson par ID
    async getSongById(req, res) {
        try {
            const song = await Song.findById(req.params.id);
            if (song) {
                res.json(song);
            } else {
                res.status(404).json({ message: "Chanson non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la chanson" });
        }
    },

    // Créer une nouvelle chanson
    async createSong(req, res) {
        try {
            const newSong = new Song(req.body);
            await newSong.save();
            res.status(201).json(newSong);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la chanson" });
        }
    },

    // Mettre à jour une chanson
    async updateSong(req, res) {
        try {
            const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (song) {
                res.json(song);
            } else {
                res.status(404).json({ message: "Chanson non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la chanson" });
        }
    },

    // Supprimer une chanson
    async deleteSong(req, res) {
        try {
            const song = await Song.findByIdAndDelete(req.params.id);
            if (song) {
                res.json({ message: "Chanson supprimée avec succès" });
            } else {
                res.status(404).json({ message: "Chanson non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la chanson" });
        }
    }
};

module.exports = SongController;
