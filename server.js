//Importation des modules utilisés
const app = require("./app");
const http = require("http");
//const { Db } = require("mongodb"); //Pour le test de la connexion à la bdd
require("dotenv").config();

/*
//Test de la connexion à la bdd
const db = require("./kernel/db");
db.connect();
*/

//Déclaration/Forçage du port d'écoute
const PORT = process.env.PORT || 8080;
app.set("port", PORT);

//Création du serveur web
var server = http.createServer(app);
server.listen(PORT);
