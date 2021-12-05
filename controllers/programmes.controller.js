//Importation des modules utilisés
const db = require("../models");
const Programme = db.programmes;

/*------------ AJOUT ------------*/

//Ajout d'une nouvelle donnée de la page programmes
exports.createOne = (req, res) => {
  delete req.body._id;
  //Création d'un nouvel objet Programme
  const programme = new Programme({
    ...req.body,
  });

  //Enregistrement d'une nouvelle donnée de la page programmes dans la bdd
  programme
    .save(programme)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while creating a new data into programmes ..."
        );
    });
};

//Ajout de plusieurs données de la page programmes
exports.createMany = (req, res) => {
  Programme.insertMany(req.body.programmes)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while creating multiple data into programmes ..."
        );
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de toutes les données de la page programmess
exports.getAll = (req, res) => {
  Programme.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while finding all data from programmes ..."
        );
    });
};

//Affichage des données de la page programmess en fonction de leur titre
exports.getByGrade = (req, res) => {
  const grade = req.params.skills;

  Programme.find({ grade: { $regex: new RegExp(grade) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(err.message || "Error while finding data from programmes ...");
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'une donnée de la page programmes via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send("Cannot update data from programmes with empty body");
  }

  const id = req.params.id;

  Programme.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update data from programmes with id: ${id}, you must verify the id !`
          );
      } else res.send("Data from programmes was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating data from programmes with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface toutes les données de la page programmes
exports.deleteAll = (req, res) => {
  Programme.deleteMany({})
    .then((data) => {
      res.send(
        `${data.deletedCount} data from programmes were successfully deleted !`
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while deleting all data from programmes ..."
        );
    });
};

//Efface une donnée de la page programmes via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  Programme.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete data from programmes with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Data from programmes was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Could not delete the data from programmes with the following id: " +
            id
        );
    });
};
