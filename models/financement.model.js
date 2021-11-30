//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Financement = mongoose.model(
    "financement", //Nom de la collection
    mongoose.Schema(
      {
        title: { type: String, unique: true, required: true },
        description: String,
        userId: { type: String, required: true },
      },
      { timestamps: true }
    )
  );
  return Financement;
};
