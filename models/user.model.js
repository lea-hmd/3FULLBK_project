//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const uniqueValidator = require("mongoose-unique-validator");
  const userSchema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      isAdmin: Boolean,
      isContentManager: Boolean,
    },
    { timestamps: true }
  );
  const User = mongoose.model(
    "user", //Nom de la collection
    userSchema
  );
  userSchema.plugin(uniqueValidator);
  return User;
};
