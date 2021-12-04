//Importation des modules utilisés
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

//Prise en charge du protocole CORS
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Parse et 'traite' le contenu des requêtes de type application/json
app.use(express.json());

// Parse et 'traite' le contenu des requêtes de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Connexion à la bdd
const db = require("./models");
const Role = db.roles;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection to the db !");
    initial();
  })
  .catch((err) => {
    console.log("Cannot connect to the db !", err);
    process.exit();
  });

//Ajout des rôles à la bdd
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "contentManager",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Added 'contentManager' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("Added 'admin' to roles collection");
      });
    }
  });
}

//Route principale du site
app.get("/", (req, res) => {
  //Permet d'afficher correctement les accents
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  //Phrase affichée si le serveur est bien fonctionnel et lancé
  res.write("Vous êtes à la racine du Projet plaquette 3FULLBK du groupe 09 !");
  res.send();
});

//Importation des routes des requêtes
require("./routes/partenaires.routes")(app);
require("./routes/certificationsPro.routes")(app);
require("./routes/financements.routes")(app);
require("./routes/contactEntreprises.routes")(app);
require("./routes/users.routes")(app);
require("./routes/auth.routes")(app);

//Création du serveur web et écoute des requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
