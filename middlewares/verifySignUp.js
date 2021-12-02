//Importation des modules utilisés
const db = require("../models");
const ROLES = db.ROLES;

//Vérification de la présence des rôles dans la bdd
exports.verifyRoleSignUp = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Role ${req.body.roles[i]} does not exist !`,
        });
        return;
      }
    }
  }
  next();
};
