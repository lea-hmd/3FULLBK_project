module.exports = (app) => {
  const partenaires = require("../controllers/partenaires.controller");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête de la création d'un nouveau partenaire
  router.post("/partenaires/addOne", partenaires.create);

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les partenaires
  router.get("/partenaires/all", partenaires.getAll);

  //Route de la requête d'affichage de tous les campus partenaires
  router.get("/partenaires/campus", partenaires.getCampus);

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de tous les partenaires
  router.delete("/partenaires/deleteAll", partenaires.deleteAll);

  //Route de la requête de suppression d'un partenaire en fonction de son nom
  router.delete("/partenaires/deleteByName/:name", partenaires.deleteByName);

  //Route de la requête de suppression d'un partenaire en fonction de son id
  router.delete("/partenaires/deleteById/:id", partenaires.deleteById);

  //Route racine de l'api
  app.use("/api", router);
};
