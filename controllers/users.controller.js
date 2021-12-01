//Importation des modules utilisés
const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*------------ AJOUT ------------*/

//Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) //Hashage du mdp
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: req.body.role || "contentManager",
      });
      const accessToken = jwt.sign(
        //Création du token d'authentification
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      user.accessToken = accessToken;

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
          const accessToken = jwt.sign(
            //Mise à jour du token d'authentification
            { userId: user._id },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );
          User.findByIdAndUpdate(user._id, { accessToken });
          res.status(200).json({
            data: { email: user.email, role: user.role },
            accessToken,
          });
        })
        .catch((err) => res.status(500).send(err.message));
    })
    .catch((error) => res.status(500).send(error.message));
};

/*------------ AFFICHAGE ------------*/

//Affichage de tous les utilisateurs
exports.getAll = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message || "Error while finding all users ...");
    });
};

//Affichage d'un utilisateur en fonction de son id
exports.getById = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot retrieve user with id: ${id}, you must verify the id !`
          );
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err.message || "Error while finding user ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'un utilisateur via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update user with empty body");
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(`Cannot update user with id: ${id}, you must verify the id !`);
      } else res.send("User was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating user with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface un utilisateur en fonction de son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(`Cannot delete user with id: ${id}, you must verify the id !`);
      } else {
        res.send("User was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send("Could not delete user with the following id: " + id);
    });
};
