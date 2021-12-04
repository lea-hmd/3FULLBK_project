module.exports = (app) => {
  const contactEntreprises = require("../controllers/contactEntreprises.controller");
  const authJwt = require("../middlewares/authJwt");
  var router = require("express").Router();

  /*------------ AJOUT ------------*/

  //Route de la requête d'ajout d'un nouveau contact d'entreprise
  router.post(
    "/contactEntreprises/addOne",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.createOne
  );

  //Route de la requête d'ajout de plusieurs contacts d'entreprise
  router.post(
    "/contactEntreprises/addMany",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.createMany
  );

  /*------------ AFFICHAGE ------------*/

  //Route de la requête d'affichage de tous les contacts d'entreprise
  router.get(
    "/contactEntreprises/all",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.getAll
  );

  //Route de la requête d'affichage des contacts d'entreprise en fonction du nom de l'entreprise
  router.get(
    "/contactEntreprises/:companyName",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.getByCompanyName
  );

  /*------------ MODIFICATION ------------*/

  //Route de la requête de modification d'un contact d'entreprise
  router.put(
    "/contactEntreprises/updateById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.updateById
  );

  /*------------ SUPPRESSION ------------*/

  //Route de la requête de suppression de tous les contacts d'entreprise
  router.delete(
    "/contactEntreprises/deleteAll",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.deleteAll
  );

  //Route de la requête de suppression d'un contact d'entreprise en fonction de son id
  router.delete(
    "/contactEntreprises/deleteById/:id",
    [authJwt.verifyToken, authJwt.isRole],
    contactEntreprises.deleteById
  );

  //Route racine de l'api
  app.use("/api", router);
};
