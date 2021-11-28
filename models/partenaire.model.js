//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Partenaire = mongoose.model(
    "campus_entreprise", //Nom de la collection
    mongoose.Schema(
      {
        name: { type: String, unique: true },
        isCampus: Boolean,
        isEntreprise: Boolean,
        imageUrl: String,
      },
      { timestamps: true }
    )
  );
  return Partenaire;
};
