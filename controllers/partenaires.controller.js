//Importation des modules utilisés
const db = require("../models");
const Partenaire = db.partenaires;

//Ajout d'un nouveau partenaire
exports.create = (req, res) => {
  //Empêche l'envoi de requêtes avec un champ vide
  if (!req.body.name || !req.body.imageUrl) {
    res.status(400).send("Cannot send an empty field !");
    return;
  }

  //Empêche l'envoi de requêtes avec un champ vide
  if (!req.body.isCampus && !req.body.isEntreprise) {
    res
      .status(400)
      .send(
        "Must have at least one value between true and false among isEntreprise and isCampus fields !"
      );
    return;
  }

  //Empêche l'envoi de requêtes avec les deux champs isCampus et isEntreprise remplis avec la même valeur
  if (req.body.isCampus === req.body.isEntreprise) {
    res
      .status(400)
      .send(
        "Cannot send same values among isEntreprise and isCampus fields, must choose one between false and true !"
      );
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
      res
        .status(500)
        .send(err.message || "Error while creating a new partenaire ...");
    });
};

//Efface tous les partenaires
exports.deleteAll = (req, res) => {
  Partenaire.deleteMany({})
    .then((data) => {
      res.send(
        `${data.deletedCount} partenaire(s) were successfully deleted !`
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while deleting all partenaires ...");
    });
};

//Efface un partenaire via son nom
exports.deleteByName = (req, res) => {
  const name = req.params.name;

  Partenaire.findOneAndDelete({ name: name })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete partenaire with name: ${name}, you must verify the name`
          );
      } else {
        res.send("Partenaire was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Could not delete the partenaire with the following name: " + name
        );
    });
};
