module.exports = (app) => {
  const certificationsPro = require("../controllers/certificationsPro.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'une nouvelle certification
  router.post(
    "/certifications-pro/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    certificationsPro.createOne
  );

  //Route de la requête d'ajout de plusieurs certifications
  router.post(
    "/certifications-pro/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    certificationsPro.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de toutes les certifications
  router.get("/certifications-pro/all", certificationsPro.getAll);

  //Route de la requête d'affichage des certifications via le nom de leur organisation certifiante
  router.get(
    "/certifications-pro/:providerName",
    certificationsPro.getByProvider
  );

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'une certification via son id
  router.put(
    "/certifications-pro/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    certificationsPro.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de toutes les certifications
  router.delete(
    "/certifications-pro/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    certificationsPro.deleteAll
  );

  //Route de la requête de suppression d'une certification en fonction de son id
  router.delete(
    "/certifications-pro/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    certificationsPro.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
