//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const uniqueValidator = require("mongoose-unique-validator");
  const User = mongoose.model(
    "user", //Nom de la collection
    mongoose.Schema(
      {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: Boolean,
        isContentManager: Boolean,
      },
      { timestamps: true }
    )
  );
  User.plugin(uniqueValidator);
  return User;
};
