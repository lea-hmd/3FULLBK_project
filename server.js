//Importation des modules utilisés
const app = require('./app');
const http = require('http');
require('dotenv').config();

//Déclaration/Forçage du port d'écoute
const PORT = process.env.PORT || 8080;
app.set('port', PORT);

//Création du serveur web
var server = http.createServer(app);
server.listen(PORT);
