const fs = require('fs');
const path = require('path');

const outputFile = 'src_dump.txt'; // Nom du fichier de sortie
const sourceDir = path.join(__dirname, 'src'); // Répertoire cible

// Fonction pour lire les fichiers récursivement
function readFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readFilesRecursively(filePath, fileList);
    } else {
      const content = fs.readFileSync(filePath, 'utf-8');
      fileList.push(`\n=== ${filePath} ===\n${content}`);
    }
  });

  return fileList;
}

// Vérifiez si le dossier `/src` existe
if (!fs.existsSync(sourceDir)) {
  console.error("Le dossier '/src' n'existe pas !");
  process.exit(1);
}

// Exporte les fichiers de `/src`
const allFiles = readFilesRecursively(sourceDir);
fs.writeFileSync(outputFile, allFiles.join('\n'), 'utf-8');

console.log(`Tous les fichiers dans '/src' ont été exportés vers ${outputFile}`);
