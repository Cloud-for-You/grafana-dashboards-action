const yaml = require('js-yaml');
const fs = require('fs');

function init(envFile, result = Boolean) {
  console.log("Zpracovavam env soubor", envFile);
  try {
    const config = yaml.safeLoad(fs.readFileSync(envFile, 'utf8'));
    const indentedJson = JSON.stringify(config, null, 4);
    console.log(indentedJson);
  } catch (error) {
    console.log(error);
  }
  return true;
}

module.exports = { init };