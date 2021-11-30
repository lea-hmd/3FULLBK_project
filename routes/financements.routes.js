module.exports = (app) => {
  const financements = require("../controllers/financements.controller");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'une nouvelle donnée de la page financement
  router.post("/financements/addOne", financements.createOne);

  //Route de la requête d'ajout de nouvelles données de la page financement
  router.post("/financements/addMany", financements.createMany);

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de toutes les données de la page financement
  router.get("/financements/all", financements.getAll);

  //Route de la requête d'affichage des données de la page financement en fonction de leur titre
  router.get("/financements/:title", financements.getByTitle);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'une donnée de la page financement en fonction de son id
  router.put("/financements/updateById/:id", financements.updateById);

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de toutes les données de la page financement
  router.delete("/financements/deleteAll", financements.deleteAll);

  //Route de la requête de suppression d'une donnée de la page financement en fonction de son id
  router.delete("/financements/deleteById/:id", financements.deleteById);

  //Route racine de l'api
  app.use("/api", router);
};
