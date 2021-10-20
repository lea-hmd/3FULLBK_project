//Importation des modules utilisés
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://gp09:IW1WNNTJH3QaCfW6@clustergp09.huqk4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Fonction de connexion à la bdd
module.exports.connect = async () => {
  try {
    await client.connect();
    console.log("Connexion à la bdd réussie !");
    return client;
  } catch (e) {
    console.log("Connexion à la bdd échouée ...");
    console.error(e);
  }
};

//Fonction de déconnexion à la bdd
module.exports.close = async () => {
  client.close();
};
