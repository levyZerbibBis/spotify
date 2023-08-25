const User = require('./userModel');
const jwt = require('jwt-simple');
const config = require('./config');

const UserController = {

   // Récupérer tous les utilisateurs
   async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
  },

  // Récupérer un utilisateur par ID
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
  },

  // Créer un nouvel utilisateur
  async createUser(req, res) {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  },

  // Supprimer un utilisateur
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (user) {
        res.json({ message: "Utilisateur supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
  },

  // Inscription
  async signUp(req, res) {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send('Email is already in use');
    }

    const user = new User({ email, password });
    await user.hashPassword();
    await user.save();

    res.json({ token: tokenForUser(user) });
  },

  // Connexion
  async signIn(req, res) {
    // L'utilisateur a déjà eu son email et son mot de passe authentifiés avec passport
    // Nous devons juste donner un token
    res.send({ token: tokenForUser(req.user) });
  }
};

// Fonction utilitaire pour générer le token
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.JWT_SECRET);
}

module.exports = UserController;
