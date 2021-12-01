//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const uniqueValidator = require("mongoose-unique-validator");
  const userSchema = mongoose.Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      role: {
        type: Boolean,
        default: "contentManager",
        enum: ["contentManager", "admin"],
      },
      accessToken: String,
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
