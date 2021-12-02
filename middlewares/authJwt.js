//Importation des modules utlisés
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Role = db.roles;

//Vérification de validité du token d'authentification
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("No token provided !");
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized !");
    }
    req.userId = decoded.id;
    next();
  });
};

//Vérification du rôle d'administrateur
isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).send("Admin role required !");
        return;
      }
    );
  });
};

//Vérification du rôle de gestionnaire de plateforme
isContentManager = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send(err.message);
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "contentManager") {
            next();
            return;
          }
        }
        res.status(403).send("Content Manager role required !");
        return;
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isContentManager,
};
module.exports = authJwt;
