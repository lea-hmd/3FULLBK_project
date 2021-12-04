module.exports = (app) => {
  const alternanceStages = require("../controllers/alternanceStages.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'une nouvelle donnée de la page alternance et stage
  router.post(
    "/alternanceStages/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    alternanceStages.createOne
  );

  //Route de la requête d'ajout de nouvelles données de la page alternance et stage
  router.post(
    "/alternanceStages/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    alternanceStages.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de toutes les données de la page alternance et stage
  router.get("/alternanceStages/all", alternanceStages.getAll);

  //Route de la requête d'affichage des données de la page alternance et stage en fonction de leur titre
  router.get("/alternanceStages/:title", alternanceStages.getByTitle);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'une donnée de la page alternance et stage en fonction de son id
  router.put(
    "/alternanceStages/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    alternanceStages.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de toutes les données de la page alternance et stage
  router.delete(
    "/alternanceStages/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    alternanceStages.deleteAll
  );

  //Route de la requête de suppression d'une donnée de la page alternance et stage en fonction de son id
  router.delete(
    "/alternanceStages/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    alternanceStages.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
