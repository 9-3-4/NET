const express = require('express');
const router = express.Router();

//associer les fonctions au differentes routes
const userCtrl = require('../controllers/user');

//autoriser récupération des donnees
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);//email password nouvel utilisateur
router.post('/login', userCtrl.login);//email password utilisateur existant
router.get('/auth', userCtrl.findAll);//récupération liste utilisateurs

module.exports = router;