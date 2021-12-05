module.exports = (app) => {
  const programmes = require("../controllers/programmes.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'une nouvelle donnée de la page programmes
  router.post(
    "/programmes/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    programmes.createOne
  );

  //Route de la requête d'ajout de nouvelles données de la page programmes
  router.post(
    "/programmes/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    programmes.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de toutes les données de la page programmes
  router.get("/programmes/all", programmes.getAll);

  //Route de la requête d'affichage des données de la page programmes en fonction du titre de leur compétences
  router.get("/programmes/:grade", programmes.getByGrade);

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'une donnée de la page programmes en fonction de son id
  router.put(
    "/programmes/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    programmes.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de toutes les données de la page programmes
  router.delete(
    "/programmes/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    programmes.deleteAll
  );

  //Route de la requête de suppression d'une donnée de la page programmes en fonction de son id
  router.delete(
    "/programmes/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    programmes.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
