//Importation des modules utilisés
const db = require("../models");
const CertificationPro = db.certificationsPro;

/*------------ AJOUT ------------*/

//Ajout d'une nouvelle certification
exports.createOne = (req, res) => {
  //Création d'un nouvel objet Certification
  const certification = new CertificationPro({
    providerName: req.body.providerName,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });

  //Enregistrement d'une certification dans la bdd
  certification
    .save(certification)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while creating a new certification ...");
    });
};

//Ajout de plusieurs certifications
exports.createMany = (req, res) => {
  CertificationPro.insertMany(req.body.certificationsPro)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while creating multiple certifications ..."
        );
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de toutes les certifications
exports.getAll = (req, res) => {
  CertificationPro.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding all certifications ...");
    });
};

//Affichage des certifications en fonction de l'organisation certifiante
exports.getByProvider = (req, res) => {
  const providerName = req.params.providerName;

  CertificationPro.find({ providerName: { $regex: new RegExp(providerName) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding certification(s) ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'une certification via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res.status(400).send("Cannot update certification with empty body");
  }

  const id = req.params.id;

  CertificationPro.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update certification with id: ${id}, you must verify the id !`
          );
      } else res.send("Certification was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating certification with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface toutes les certifications
exports.deleteAll = (req, res) => {
  CertificationPro.deleteMany({})
    .then((data) => {
      res.send(
        `${data.deletedCount} certification(s) were successfully deleted !`
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while deleting all certifications ...");
    });
};

//Efface une certification via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  CertificationPro.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete certification with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Certification was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Could not delete the certification with the following id: " + id
        );
    });
};
