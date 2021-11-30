//Importation des modules utilisés
const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
/*------------ AJOUT ------------*/

//Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
        isContentManager: req.body.isContentManager
          ? req.body.isContentManager
          : false,
      });
      user
        .save(user)
        .then((data) =>
          res.status(201).send("New user successfullly created !" + data)
        )
        .catch((err) => res.status(400).send(err.message));
    })
    .catch((err) =>
      res.status(500).send(err.message || "Error while creating a new user ...")
    );
};
