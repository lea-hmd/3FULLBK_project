//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const ContactEntreprise = mongoose.model(
    "contact_entreprise", //Nom de la collection
    mongoose.Schema(
      {
        companyName: String,
        address: String,
        zipcode: Number,
        city: String,
        prospectorFirstname: String,
        prospectorLastname: String,
        prospectorPhoneNumber: Number,
        prospectorEmail: { type: String, unique: true },
        interestedIn: String,
      },
      { timestamps: true }
    )
  );
  return ContactEntreprise;
};
