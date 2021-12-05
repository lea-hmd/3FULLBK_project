//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Programme = mongoose.model(
    "programme", //Nom de la collection
    mongoose.Schema(
      {
        grade: { type: String, unique: true, required: true },
        skillGoal: String,
        systemNetworkCloud: [
          {
            type: String,
          },
        ],
        data: [
          {
            type: String,
          },
        ],
        softwareDevDesign: [
          {
            type: String,
          },
        ],
        personalSkills: [
          {
            type: String,
          },
        ],
        profesionnalSkills: [
          {
            type: String,
          },
        ],
      },
      { timestamps: true }
    )
  );
  return Programme;
};
