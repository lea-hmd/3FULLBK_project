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

//Connexion d'un utilisateur
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .send("User not found please verify informations !");
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send("Password incorrect !");
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((err) => res.status(500).send(err.message));
    })
    .catch((error) => res.status(500).send(error.message));
};
