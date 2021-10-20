//Importation des modules utilisés
const express = require("express");
const app = express();
const router = express.Router();

//Permet de créer les différentes routes du site
router.get("/", (req, res) => {
  //Permet d'afficher correctement les accents
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  //Phrase affichée si le serveur est bien fonctionnel et lancé
  res.write("Vous êtes à la racine du Projet plaquette 3FULLBK du groupe 09 !");
  res.send();
});

app.use("/", router);

module.exports = app;
