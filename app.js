//Importation des modules utilisés
const express = require('express');
const app = express();
const router = express.Router();
const partenairesModel = require('./models/partenaires');

//Route principale du site
router.get('/', (req, res) => {
  //Permet d'afficher correctement les accents
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //Phrase affichée si le serveur est bien fonctionnel et lancé
  res.write('Vous êtes à la racine du Projet plaquette 3FULLBK du groupe 09 !');
  res.send();
});

//Affiche la route principale
app.use('/', router);

//Affiche tous les partenaires
app.get('/partenaires', (req, res) => {
  partenairesModel.findAll().then((partenaires) => {
    res.send(partenaires);
  });
});

module.exports = app;
