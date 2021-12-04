//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const ContactEtudiant = mongoose.model(
    "contact_étudiant", //Nom de la collection
    mongoose.Schema(
      {
        firstname: String,
        lastname: String,
        address: String,
        zipcode: Number,
        city: String,
        phoneNumber: Number,
        email: { type: String, unique: true },
        schoolName: String,
        schoolAddress: String,
        schoolZipcode: Number,
        schoolCity: String,
        currentGrade: String,
        estiamWantedGrade: String,
        specialization: String,
        professionnalCursus: String,
      },
      { timestamps: true }
    )
  );
  return ContactEtudiant;
};
