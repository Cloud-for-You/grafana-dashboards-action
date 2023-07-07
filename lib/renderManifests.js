const fs = require('fs');
const yaml = require('js-yaml');
const validateYamlSchema = require('yaml-schema-validator');

const requireJson = {
  name: {
    first: { type: String, required: true },
    last: { type: String, requires: true }
  }
}

function init(envFile, result = Boolean) {
  console.log("Zpracovavam env soubor", envFile);
  const config = yaml.load(fs.readFileSync(envFile, 'ut8'));
  const indentedJson = JSON.stringify(config, null, 4);
  try {
    // Validate ENV file
    validateYamlSchema(indentedJson, { schema: requireJson })
    console.log(indentedJson);
  } catch (error) {
    console.log(error);
  }
  return true;
}

module.exports = { init };