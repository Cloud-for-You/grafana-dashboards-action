const fs = require('fs');
const path = require('path');

function getEnvFiles(directory, fileName, result = []) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getEnvFiles(filePath, fileName, result);
    } else if (stats.isFile() && file === fileName) {
      result.push(filePath);
    }
  }

  return result;
}

module.exports = { getEnvFiles };