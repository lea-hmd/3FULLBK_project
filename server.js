//Importation des modules utilisés
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:3000",
};

//Prise en charge du protocole CORS
app.use(cors(corsOptions));

// Parse et 'traite' le contenu des requêtes de type application/json
app.use(express.json());

// Parse et 'traite' le contenu des requêtes de type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Met en place les header et la validation du token
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const accessToken = req.headers["x-access-token"];
    const { userId, exp } = await jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );
    //Vérifie si le token est expiré
    if (exp < Date.now().valueOf() / 1000) {
      return res
        .status(401)
        .json({
          error: "JWT token has expired, please login to obtain a new one",
        });
    }
    res.locals.loggedInUser = await User.findById(userId);
    next();
  } else {
    next();
  }
});

//Connexion à la bdd
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful connection to the db !");
  })
  .catch((err) => {
    console.log("Cannot connect to the db !", err);
    process.exit();
  });

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
require("./routes/users.routes")(app);

//Création du serveur web et écoute des requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
