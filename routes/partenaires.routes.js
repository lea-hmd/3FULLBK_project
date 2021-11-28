module.exports = (app) => {
  const partenaires = require("../controllers/partenaires.controller");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête de création d'un nouveau partenaire
  router.post("/partenaires/addOne", partenaires.createOne);

  //Route de la requête de création de plusieurs partenaires
  router.post("/partenaires/addMany", partenaires.createMany);

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les partenaires
  router.get("/partenaires/all", partenaires.getAll);

  //Route de la requête d'affichage de tous les campus partenaires
  router.get("/partenaires/campus", partenaires.getCampus);

  //Route de la requête d'affichage de toutes les entreprises partenaires
  router.get("/partenaires/entreprises", partenaires.getEntreprises);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un partenaire via son id
  router.put("/partenaires/updateById/:id", partenaires.updateById);

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
