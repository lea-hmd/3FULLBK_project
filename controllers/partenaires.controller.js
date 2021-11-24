//Importation des modules utilisés
const db = require('../models');
const Partenaire = db.partenaires;

//Ajout d'un nouveau partenaire
exports.create = (req, res) => {
  //Empêche l'envoi de requêtes avec un champ vide
  if (
    !req.body.name ||
    (!req.body.isCampus && !req.body.isEntreprise) ||
    !req.body.imageUrl
  ) {
    res.status(400).send('Cannot send an empty field !');
    return;
  }

  //Création d'un nouvel objet Partenaire
  const partenaire = new Partenaire({
    name: req.body.name,
    isCampus: req.body.isCampus ? req.body.isCampus : false,
    isEntreprise: req.body.isEntreprise ? req.body.isEntreprise : false,
    imageUrl: req.body.imageUrl,
  });

  //Enregistrement du partenaire dans la bdd
  partenaire
    .save(partenaire)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error while creating a new partenaire ...',
      });
    });
};
