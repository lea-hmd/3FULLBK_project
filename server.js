//Importation des modules utilisés
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

var corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

// Parse et 'traite' le contenu des requêtes de type application/json
app.use(express.json());

// Parse et 'traite' le contenu des requêtes de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Route principale du site
app.get('/', (req, res) => {
  //Permet d'afficher correctement les accents
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //Phrase affichée si le serveur est bien fonctionnel et lancé
  res.write('Vous êtes à la racine du Projet plaquette 3FULLBK du groupe 09 !');
  res.send();
});

//Création du serveur web et écoute des requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
