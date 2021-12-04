//Importation des modules utilisés
const db = require("../models");
const AlternanceStage = db.alternanceStages;

/*------------ AJOUT ------------*/

//Ajout d'une nouvelle donnée de la page alternance et stage
exports.createOne = (req, res) => {
  delete req.body._id;
  //Création d'un nouvel objet AlternanceStage
  const alternanceStage = new AlternanceStage({
    ...req.body,
  });

  //Enregistrement d'une nouvelle donnée de la page alternance et stage dans la bdd
  alternanceStage
    .save(alternanceStage)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while creating a new data into alternance_stages ..."
        );
    });
};

//Ajout de plusieurs données de la page alternance et stage
exports.createMany = (req, res) => {
  AlternanceStage.insertMany(req.body.alternanceStages)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while creating multiple data into alternance_stages ..."
        );
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de toutes les données de la page alternance et stages
exports.getAll = (req, res) => {
  AlternanceStage.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while finding all data from alternance_stages ..."
        );
    });
};

//Affichage des données de la page alternance et stages en fonction de leur titre
exports.getByTitle = (req, res) => {
  const title = req.params.title;

  AlternanceStage.find({ title: { $regex: new RegExp(title) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while finding data from alternance_stages ..."
        );
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'une donnée de la page alternance et stage via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send("Cannot update data from alternance_stages with empty body");
  }

  const id = req.params.id;

  AlternanceStage.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update data from alternance_stages with id: ${id}, you must verify the id !`
          );
      } else res.send("Data from alternance_stages was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating data from alternance_stages with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface toutes les données de la page alternance et stage
exports.deleteAll = (req, res) => {
  AlternanceStage.deleteMany({})
    .then((data) => {
      res.send(
        `${data.deletedCount} data from alternance_stages were successfully deleted !`
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while deleting all data from alternance_stages ..."
        );
    });
};

//Efface une donnée de la page alternance et stage via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  AlternanceStage.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete data from alternance_stages with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Data from alternance_stages was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Could not delete the data from alternance_stages with the following id: " +
            id
        );
    });
};
