const fs = require('fs');
const yaml = require('js-yaml');
const validateYamlSchema = require('yaml-schema-validator');

const requireJson = {
  type: { type: String, required: true },
  url: { type: String, required false },
  artifact: { type: String, required, false },
  version: { type: String, required, false },
  values: { type: Array, required: false },
  patch: { type: Object, required: false }
}

function init(envFile, result = Boolean) {
  console.log("Zpracovavam env soubor", envFile);
  const config = yaml.load(fs.readFileSync(envFile, 'utf8'));
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