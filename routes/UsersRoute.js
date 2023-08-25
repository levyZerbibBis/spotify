const express = require('express');
const jwt = require('express-jwt');
const UserController = require('./userController');
const config = require('./config');

const router = express.Router();

// Middleware JWT pour protéger les routes
const auth = jwt({
  secret: config.JWT_SECRET,
  userProperty: 'payload'  // Ceci ajoute req.payload contenant les informations du JWT décodé.
});

// Routes liées à l'authentification
router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);

// Routes pour la gestion des utilisateurs
router.get('/users', auth, UserController.getAllUsers);  // Protégé par JWT
router.get('/users/:id', auth, UserController.getUserById);  // Protégé par JWT
router.post('/users', auth, UserController.createUser);  // Protégé par JWT
router.put('/users/:id', auth, UserController.updateUser);  // Protégé par JWT
router.delete('/users/:id', auth, UserController.deleteUser);  // Protégé par JWT

module.exports = router;
