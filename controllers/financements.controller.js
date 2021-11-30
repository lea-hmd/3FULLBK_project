//Importation des modules utilisés
const db = require("../models");
const Financement = db.financements;

/*------------ AJOUT ------------*/

//Ajout d'une nouvelle donnée de la page financement
exports.createOne = (req, res) => {
  delete req.body._id;
  //Création d'un nouvel objet financement
  const financement = new Financement({
    ...req.body,
  });

  //Enregistrement d'une nouvelle donnée de la page financement dans la bdd
  financement
    .save(financement)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while creating a new data into financements ..."
        );
    });
};

//Ajout de plusieurs données de la page financements
exports.createMany = (req, res) => {
  Financement.insertMany(req.body.financements)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while creating multiple data into financements ..."
        );
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de toutes les données de la page financements
exports.getAll = (req, res) => {
  Financement.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while finding all data from financements ..."
        );
    });
};

//Affichage des données de la page financements en fonction de leur titre
exports.getByTitle = (req, res) => {
  const title = req.params.title;

  Financement.find({ title: { $regex: new RegExp(title) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding data from financements ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'une donnée de la page financement via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send("Cannot update data from financement with empty body");
  }

  const id = req.params.id;

  Financement.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update data from financement with id: ${id}, you must verify the id !`
          );
      } else res.send("Data from financement was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating data from financement with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface toutes les données de la page financements
exports.deleteAll = (req, res) => {
  Financement.deleteMany({})
    .then((data) => {
      res.send(
        `${data.deletedCount} data from financements were successfully deleted !`
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while deleting all data from financements ..."
        );
    });
};

//Efface une donnée de la page financement via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  Financement.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete data from financement with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Data from financement was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Could not delete the data from financement with the following id: " +
            id
        );
    });
};
