//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const BlocCompetence = mongoose.model(
    "bloc_compétence", //Nom de la collection
    mongoose.Schema(
      {
        name: { type: String, unique: true, required: true },
        skills: [
          {
            type: String,
          },
        ],
      },
      { timestamps: true }
    )
  );
  return BlocCompetence;
};
