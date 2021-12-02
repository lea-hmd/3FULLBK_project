# 3FULLBK_project

Projet Plaquette de dématérialisation de la brochure ÉSTIAM (BACKEND).

## Pré-requis pour le lancement du projet

Tout comprendre sur l'installation et l'utilisation du projet.

### Installation

- Il est toujours bon de mettre à jour le gestionnaire de paquet npm avant de cloner un nouveau projet :
  ```sh
  npm i npm@latest -g
  ```

1. Cloner le projet :
   ```sh
   git clone https://github.com/lea-hmd/3FULLBK_project.git
   ```
2. Installer les dépendances du projet (en lançant la commande dans le dossier racine '3FULLBK_project') :
   ```sh
   npm i
   ```
3. Lancer le projet :

   ```sh
   #Utiliser nodemon pour permettre au serveur de se relancer à chaque modification
   nodemon start

   #Utiliser npm start pour lancer le serveur une seule fois
   npm start
   ```

4. Visualiser la racine du projet dans le navigateur via l'adresse http://localhost:3000 en local ou http://141.94.220.102:3000 via notre VPS.
