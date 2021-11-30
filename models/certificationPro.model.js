//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const CertificationPro = mongoose.model(
    "certifications_professionnelle", //Nom de la collection
    mongoose.Schema(
      {
        providerName: { type: String, required: true },
        title: { type: String, unique: true, required: true },
        description: String,
        imageUrl: String,
      },
      { timestamps: true }
    )
  );
  return CertificationPro;
};
