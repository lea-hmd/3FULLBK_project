//Importation des modules utilisés
const db = require("../models");
const ContactEtudiant = db.contactEtudiants;

/*------------ AJOUT ------------*/

//Ajout d'un nouveau contact étudiant
exports.createOne = (req, res) => {
  delete req.body._id;
  //Création d'un nouvel objet ContactEtudiant
  const contactEtudiant = new ContactEtudiant({
    ...req.body,
  });

  //Enregistrement d'un nouveau contact étudiant dans la bdd
  contactEtudiant
    .save(contactEtudiant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while creating a new contact ...");
    });
};

//Ajout de plusieurs contacts étudiant
exports.createMany = (req, res) => {
  ContactEtudiant.insertMany(req.body.contactEtudiants)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while creating multiple contacts ...");
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de tous les contacts étudiant
exports.getAll = (req, res) => {
  ContactEtudiant.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding all contacts ...");
    });
};

//Affichage des contacts étudiant en fonction de leur classe estiam souhaitée
exports.getByEstiamWantedGrade = (req, res) => {
  const estiamWantedGrade = req.params.estiamWantedGrade;

  ContactEtudiant.find({ title: { $regex: new RegExp(estiamWantedGrade) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message || "Error while finding contact(s) ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'un contact étudiant via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update contact with empty body");
  }

  const id = req.params.id;

  ContactEtudiant.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update contact with id: ${id}, you must verify the id !`
          );
      } else res.send("Contact was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating contact with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface tous les contacts étudiant
exports.deleteAll = (req, res) => {
  ContactEtudiant.deleteMany({})
    .then((data) => {
      res.send(`${data.deletedCount} contact(s) were successfully deleted !`);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while deleting all contacts ...");
    });
};

//Efface un contact étudiant via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  ContactEtudiant.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete contact with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Contact was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send("Could not delete contact with the following id: " + id);
    });
};
