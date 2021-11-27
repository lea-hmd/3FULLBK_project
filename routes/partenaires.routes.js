module.exports = (app) => {
  const partenaires = require("../controllers/partenaires.controller");
  var router = require("express").Router();

  //Route de la requête de la création d'un nouveau partenaire
  router.post("/partenaires/addOne", partenaires.create);

  //Route de la requête de suppression de tous les partenaires
  router.delete("/partenaires/deleteAll", partenaires.deleteAll);

  //Route de la requête de suppression d'un partenaire en fonction de son nom
  router.delete("/partenaires/deleteByName/:name", partenaires.deleteByName);

  //Route de la requête de suppression d'un partenaire en fonction de son id
  router.delete("/partenaires/deleteById/:id", partenaires.deleteById);

  //Route racine de l'api
  app.use("/api", router);
};
