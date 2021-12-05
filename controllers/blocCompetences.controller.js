//Importation des modules utilisés
const db = require("../models");
const BlocCompetence = db.blocCompetences;

/*------------ AJOUT ------------*/

//Ajout d'une nouvelle donnée de la page blocs de compétences
exports.createOne = (req, res) => {
  delete req.body._id;
  //Création d'un nouvel objet BlocCompetence
  const blocCompetence = new BlocCompetence({
    ...req.body,
  });

  //Enregistrement d'une nouvelle donnée de la page blocs de compétences dans la bdd
  blocCompetence
    .save(blocCompetence)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while creating a new data into bloc_compétences ..."
        );
    });
};

//Ajout de plusieurs données de la page blocs de compétences
exports.createMany = (req, res) => {
  BlocCompetence.insertMany(req.body.blocCompetences)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while creating multiple data into bloc_compétences ..."
        );
    });
};

/*------------ AFFICHAGE ------------*/

//Affichage de toutes les données de la page blocs de compétencess
exports.getAll = (req, res) => {
  BlocCompetence.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while finding all data from bloc_compétences ..."
        );
    });
};

//Affichage des données de la page blocs de compétencess en fonction de leur titre
exports.getBySkills = (req, res) => {
  const skills = req.params.skills;

  BlocCompetence.find({ skills: { $regex: new RegExp(skills) } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message || "Error while finding data from bloc_compétences ..."
        );
    });
};

/*------------ MODIFICATION ------------*/

//Modification d'une donnée de la page blocs de compétences via son id
exports.updateById = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send("Cannot update data from bloc_compétences with empty body");
  }

  const id = req.params.id;

  BlocCompetence.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot update data from bloc_compétences with id: ${id}, you must verify the id !`
          );
      } else res.send("Data from bloc_compétences was successfully updated.");
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error while updating data from bloc_compétences with the following id: " +
            id +
            ", please check if there is no identical data in the database !"
        );
    });
};

/*------------ SUPPRESSION ------------*/

//Efface toutes les données de la page blocs de compétences
exports.deleteAll = (req, res) => {
  BlocCompetence.deleteMany({})
    .then((data) => {
      res.send(
        `${data.deletedCount} data from bloc_compétences were successfully deleted !`
      );
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          err.message ||
            "Error while deleting all data from bloc_compétences ..."
        );
    });
};

//Efface une donnée de la page blocs de compétences via son id
exports.deleteById = (req, res) => {
  const id = req.params.id;

  BlocCompetence.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send(
            `Cannot delete data from bloc_compétences with id: ${id}, you must verify the id !`
          );
      } else {
        res.send("Data from bloc_compétences was successfully deleted !");
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Could not delete the data from bloc_compétences with the following id: " +
            id
        );
    });
};
