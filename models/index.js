//Importation des modules utilisés
require("dotenv").config();
const dbUrl = process.env.URI;
const mongoose = require("mongoose");

//Déclaration globale de mongoose
mongoose.Promise = global.Promise;

//Initialisation de la bdd
const db = {};
db.mongoose = mongoose;
db.url = dbUrl;
db.partenaires = require("./partenaire.model.js")(mongoose);
db.certificationsPro = require("./certificationPro.model")(mongoose);
db.financements = require("./financement.model")(mongoose);
db.users = require("./user.model")(mongoose);
module.exports = db;
