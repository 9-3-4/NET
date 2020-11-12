const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("./../models/user.js");

//Création d'un user
exports.signup = (req, res) => {
    // Valider la requète
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };
    //hashage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // Création de l'user
            const user = new User({
                ...req.body,
                password: hash
            });
            // Ajout utilisateur dans la database
            User.create(user, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Customer."
                    });
                else res.status(201).send(data);
            });
        })
};

//Récupération liste des utilisateurs
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

//recherche d'un utilisateur
exports.login = (req, res) => {
    //recherche de l utilisateur
    User.findByPseudo(req.body.pseudo, (err, data) => {
        user = data[0]
        //Si utilisateur n'existe pas
        if (user.length == 0) {
            console.log('user non trouvé')
            res.status(401).json({ error: 'Utilisateur non trouvé' })
        }
        //Si utilisateur existe, vérification du mot de passe
        else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    //SI valid récupération de l'id et création du TOKEN
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        ),
                    });
                })
                .catch(error => res.status(500).json({ error }));
        }
    });
};


//Suppression utilisateur
exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.idd}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.id
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};