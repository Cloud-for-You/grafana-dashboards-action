const fs = require('fs');
const yaml = require('js-yaml');

// Priprava pro validaci vstupnich dat
const Ajv = require('ajv');
const jsonSchema = require('./schema.json');
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);

function init(envFile, result = Boolean) {
  console.log("Zpracovavam env soubor", envFile);
  const config = yaml.load(fs.readFileSync(envFile, 'utf8'));
  const indentedJson = JSON.stringify(config, null, 4);

  try {
    console.log(indentedJson);

    // Provedeme validaci ENV oproti Schematu
    const valid = validate(config);
    if (valid) {
      console.log('JSON data jsou validní.');
    } else {
      console.log('JSON data nejsou validní.');
      console.log('Chyby:', validate.errors);
    }    
  } catch (error) {
    console.log(error);
  }
  return true;
}

module.exports = { init };