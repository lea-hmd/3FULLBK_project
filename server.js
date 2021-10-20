//Importation des modules utilisés
const app = require("./app");
const http = require("http");
require("dotenv").config();

//Déclaration/Forçage du port d'écoute
let port = process.env.PORT || 5000;
app.set("port", port);

//Création du serveur web
var server = http.createServer(app);
server.listen(port);