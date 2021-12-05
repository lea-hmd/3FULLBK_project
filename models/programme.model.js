//Création du modèle et de son schéma de données
module.exports = (mongoose) => {
  const Programme = mongoose.model(
    "programme", //Nom de la collection
    mongoose.Schema(
      {
        grade: { type: String, unique: true, required: true },
        skillGoal: String,
        TECH1: [
          {
            type: String,
          },
        ],
        TECH2: [
          {
            type: String,
          },
        ],
        SOFT1: [
          {
            type: String,
          },
        ],
        SOFT2: [
          {
            type: String,
          },
        ],
        PRO: [
          {
            type: String,
          },
        ],
        DATASOFT: [
          {
            type: String,
          },
        ],
        SPEDAD: [
          {
            type: String,
          },
        ],
        SPECCSN: [
          {
            type: String,
          },
        ],
        SPEBDAI: [
          {
            type: String,
          },
        ],
        SPEWMD: [
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
