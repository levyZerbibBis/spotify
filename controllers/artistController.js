const Artist = require('./artistModel');

const ArtistController = {

    // Récupérer tous les artistes
    async getAllArtists(req, res) {
        try {
            const artists = await Artist.find();
            res.json(artists);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des artistes" });
        }
    },

    // Récupérer un artiste par ID
    async getArtistById(req, res) {
        try {
            const artist = await Artist.findById(req.params.id);
            if (artist) {
                res.json(artist);
            } else {
                res.status(404).json({ message: "Artiste non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'artiste" });
        }
    },

    // Créer un nouvel artiste
    async createArtist(req, res) {
        try {
            const newArtist = new Artist(req.body);
            await newArtist.save();
            res.status(201).json(newArtist);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'artiste" });
        }
    },

    // Mettre à jour un artiste
    async updateArtist(req, res) {
        try {
            const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (artist) {
                res.json(artist);
            } else {
                res.status(404).json({ message: "Artiste non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'artiste" });
        }
    },

    // Supprimer un artiste
    async deleteArtist(req, res) {
        try {
            const artist = await Artist.findByIdAndDelete(req.params.id);
            if (artist) {
                res.json({ message: "Artiste supprimé avec succès" });
            } else {
                res.status(404).json({ message: "Artiste non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'artiste" });
        }
    }
};

module.exports = ArtistController;
