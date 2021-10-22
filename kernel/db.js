//Importation des modules utilisés
const { MongoClient } = require("mongodb");
require("dotenv").config();

const URI = process.env.URI;
const CLIENT = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Fonction de connexion à la bdd
module.exports.connect = async () => {
  try {
    await CLIENT.connect();
    console.log("Connexion à la bdd réussie !");
    return CLIENT;
  } catch (e) {
    console.log("Connexion à la bdd échouée ...");
    console.error(e);
  }
};

//Fonction de déconnexion à la bdd
module.exports.close = async () => {
  CLIENT.close();
};
