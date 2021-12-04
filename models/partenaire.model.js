//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Partenaire = mongoose.model(
    "campus_entreprise", //Nom de la collection
    mongoose.Schema(
      {
        name: { type: String, unique: true, required: true },
        isCampus: { type: Boolean, required: true },
        isEntreprise: { type: Boolean, required: true },
        imageUrl: { type: String, required: true },
      },
      { timestamps: true }
    )
  );
  return Partenaire;
};
