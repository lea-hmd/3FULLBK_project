module.exports = (app) => {
  const blocCompetences = require("../controllers/blocCompetences.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'une nouvelle donnée de la page blocs de compétences
  router.post(
    "/blocCompetences/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    blocCompetences.createOne
  );

  //Route de la requête d'ajout de nouvelles données de la page blocs de compétences
  router.post(
    "/blocCompetences/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    blocCompetences.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de toutes les données de la page blocs de compétences
  router.get("/blocCompetences/all", blocCompetences.getAll);

  //Route de la requête d'affichage des données de la page blocs de compétences en fonction du titre de leur compétences
  router.get("/blocCompetences/:skills", blocCompetences.getBySkills);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'une donnée de la page blocs de compétences en fonction de son id
  router.put(
    "/blocCompetences/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    blocCompetences.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de toutes les données de la page blocs de compétences
  router.delete(
    "/blocCompetences/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    blocCompetences.deleteAll
  );

  //Route de la requête de suppression d'une donnée de la page blocs de compétences en fonction de son id
  router.delete(
    "/blocCompetences/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    blocCompetences.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
