module.exports = (app) => {
  const contactEtudiants = require("../controllers/contactEtudiants.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'un nouveau contact étudiant
  router.post(
    "/contactEtudiants/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.createOne
  );

  //Route de la requête d'ajout de plusieurs contacts étudiant
  router.post(
    "/contactEtudiants/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les contacts étudiant
  router.get(
    "/contactEtudiants/all",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.getAll
  );

  //Route de la requête d'affichage des contacts étudiant en fonction de leur classe souhaitée
  router.get(
    "/contactEtudiants/:estiamWantedGrade",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.getByEstiamWantedGrade
  );

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un contact étudiant
  router.put(
    "/contactEtudiants/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de tous les contacts étudiant
  router.delete(
    "/contactEtudiants/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.deleteAll
  );

  //Route de la requête de suppression d'un contact étudiant en fonction de son id
  router.delete(
    "/contactEtudiants/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    contactEtudiants.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
