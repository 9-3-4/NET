const express = require('express');
const router = express.Router();

//associer les fonctions au differentes routes
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);//email password nouvel utilisateur
router.post('/login', userCtrl.login);//email password utilisateur existant

module.exports = router;