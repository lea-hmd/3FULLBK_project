module.exports = (app) => {
  const users = require("../controllers/users.controller");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête de création d'un utilisateur
  router.post("/users/signup", users.signup);

  //Route de la requête dde connexion d'un utilisateur
  router.post("/users/login", users.login);

  //Route racine de l'api
  app.use("/api", router);
};
