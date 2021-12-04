//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const AlternanceStage = mongoose.model(
    "alternance_stage", //Nom de la collection
    mongoose.Schema(
      {
        title: { type: String, unique: true, required: true },
        description: String,
      },
      { timestamps: true }
    )
  );
  return AlternanceStage;
};
