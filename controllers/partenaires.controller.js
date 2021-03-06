//Importation des modules utilisés
const db = require("../models");
const Partenaire = db.partenaires;

/*------------ AJOUT ------------*/

//Ajout d'un nouveau partenaire
exports.createOne = (req, res) => {
  //Empêche l'envoi de requêtes avec les deux champs isCampus et isEntreprise remplis avec la même valeur
  if (req.body.isCampus === req.body.isEntreprise) {
    res
      .status(400)
      .send(
        "Cannot send same values among isEntreprise and isCampus fields, must choose one between false and true !"
      );
    return;
  }

  delete req.body._id;
  //Création d'un nouvel objet Partenaire
  const partenaire = new Partenaire({
    ...req.body,
    isCampus: req.body.isCampus ? req.body.isCampus : false,
    isEntreprise: req.body.isEntreprise ? req.body.isEntreprise : false,
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

//Ajout de plusieurs partenaires
exports.createMany = (req, res) => {
  Partenaire.insertMany(req.body.partenaires)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while creating multiple partenaires ...");
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de tous les partenaires
exports.getAll = (req, res) => {
  Partenaire.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding all partenaires ...");
    });
};

//Affichage de tous les campus partenaires
exports.getCampus = (req, res) => {
  Partenaire.find({ isCampus: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding campus partenaires ...");
    });
};

//Affichage de toutes les entreprises partenaires
exports.getEntreprises = (req, res) => {
  Partenaire.find({ isEntreprise: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding entreprises partenaires ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'un partenaire via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update partenaire with empty body");
  }

  const id = req.params.id;

  Partenaire.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update partenaire with id: ${id}, you must verify the id !`
          );
      } else res.send("Partenaire was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating partenaire with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

//Modification d'un partenaire via son nom
exports.updateByName = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update partenaire with empty body");
  }

  const name = req.params.name;

  Partenaire.findOneAndUpdate(name, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update partenaire with name: ${name}, you must verify the name !`
          );
      } else res.send("Partenaire was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating partenaire with the following name: " +
            name +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

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
            `Cannot delete partenaire with name: ${name}, you must verify the name !`
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

//Efface un partenaire via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  Partenaire.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete partenaire with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Partenaire was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send("Could not delete the partenaire with the following id: " + id);
    });
};
