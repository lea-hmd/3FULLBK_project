//Importation des modules utilisés
const db = require("../models");
const ContactEntreprise = db.contactEntreprises;

/*------------ AJOUT ------------*/

//Ajout d'un nouveau contact d'entreprise
exports.createOne = (req, res) => {
  delete req.body._id;
  //Création d'un nouvel objet ContactEntreprise
  const contactEntreprise = new ContactEntreprise({
    ...req.body,
  });

  //Enregistrement d'un nouveau contact d'entreprise dans la bdd
  contactEntreprise
    .save(contactEntreprise)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while creating a new contact ...");
    });
};

//Ajout de plusieurs contacts d'entreprise
exports.createMany = (req, res) => {
  ContactEntreprise.insertMany(req.body.contactEntreprises)
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

//Affichage de tous les contacts d'entreprise
exports.getAll = (req, res) => {
  ContactEntreprise.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding all contacts ...");
    });
};

//Affichage des contacts d'entreprise en fonction du nom de l'entreprise
exports.getByCompanyName = (req, res) => {
  const companyName = req.params.companyName;

  ContactEntreprise.find({ title: { $regex: new RegExp(companyName) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err.message || "Error while finding contact(s) ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'un contact d'entreprise via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update contact with empty body");
  }

  const id = req.params.id;

  ContactEntreprise.findByIdAndUpdate(id, req.body)
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

//Efface tous les contacts d'entreprise
exports.deleteAll = (req, res) => {
  ContactEntreprise.deleteMany({})
    .then((data) => {
      res.send(`${data.deletedCount} contact(s) were successfully deleted !`);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while deleting all contacts ...");
    });
};

//Efface un contact d'entreprise via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  ContactEntreprise.findByIdAndDelete(id)
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
