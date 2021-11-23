//Importation des modules utilisés
const db = require('../kernel/db');

//Récupère toutes les données de la collection campus_entreprises
module.exports.findAll = async function () {
  let partenaires = db
    .connect()
    .then(async (client) => {
      let partenaires = await client
        .db('Projet_Plaquette')
        .collection('campus_entreprises')
        .find()
        .toArray();
      return partenaires;
    })
    .catch(console.error);
  return partenaires;
};
