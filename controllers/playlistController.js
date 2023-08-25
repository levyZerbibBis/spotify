const Playlist = require('./playlistModel');

const PlaylistController = {

    // Récupérer toutes les playlists
    async getAllPlaylists(req, res) {
        try {
            const playlists = await Playlist.find();
            res.json(playlists);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des playlists" });
        }
    },

    // Récupérer une playlist par ID
    async getPlaylistById(req, res) {
        try {
            const playlist = await Playlist.findById(req.params.id);
            if (playlist) {
                res.json(playlist);
            } else {
                res.status(404).json({ message: "Playlist non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la playlist" });
        }
    },

    // Créer une nouvelle playlist
    async createPlaylist(req, res) {
        try {
            const newPlaylist = new Playlist(req.body);
            await newPlaylist.save();
            res.status(201).json(newPlaylist);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la playlist" });
        }
    },

    // Mettre à jour une playlist
    async updatePlaylist(req, res) {
        try {
            const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (playlist) {
                res.json(playlist);
            } else {
                res.status(404).json({ message: "Playlist non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la playlist" });
        }
    },

    // Supprimer une playlist
    async deletePlaylist(req, res) {
        try {
            const playlist = await Playlist.findByIdAndDelete(req.params.id);
            if (playlist) {
                res.json({ message: "Playlist supprimée avec succès" });
            } else {
                res.status(404).json({ message: "Playlist non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la playlist" });
        }
    }
};

module.exports = PlaylistController;
