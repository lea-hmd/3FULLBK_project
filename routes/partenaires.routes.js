module.exports = (app) => {
  const partenaires = require("../controllers/partenaires.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête de création d'un nouveau partenaire
  router.post(
    "/partenaires/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.createOne
  );

  //Route de la requête de création de plusieurs partenaires
  router.post(
    "/partenaires/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les partenaires
  router.get("/partenaires/all", partenaires.getAll);

  //Route de la requête d'affichage de tous les campus partenaires
  router.get("/partenaires/campus", partenaires.getCampus);

  //Route de la requête d'affichage de toutes les entreprises partenaires
  router.get("/partenaires/entreprises", partenaires.getEntreprises);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un partenaire via son id
  router.put(
    "/partenaires/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.updateById
  );

  //Route de la requête de modification d'un partenaire via son nom
  router.put(
    "/partenaires/updateByName/:name",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.updateByName
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de tous les partenaires
  router.delete(
    "/partenaires/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.deleteAll
  );

  //Route de la requête de suppression d'un partenaire en fonction de son nom
  router.delete(
    "/partenaires/deleteByName/:name",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.deleteByName
  );

  //Route de la requête de suppression d'un partenaire en fonction de son id
  router.delete(
    "/partenaires/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    partenaires.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
