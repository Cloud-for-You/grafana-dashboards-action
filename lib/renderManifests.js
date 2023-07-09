const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Priprava pro validaci vstupnich dat
const Ajv = require('ajv');
const jsonSchema = require('./schema.json');
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);

function render(configFile, result = Boolean) {
  const directory = path.dirname(configFile);
  const config = yaml.load(fs.readFileSync(configFile, 'utf8'));
  const indentedJson = JSON.stringify(config, null, 4);

  try {
    // Provedeme validaci ENV oproti Schematu
    const valid = validate(config);
    // Renderujeme funkci podle typu uvedeneho v konfiguracnim souboru
    if (valid) {
      switch (config.type) {
        case 'json':
          renderJson(directory, configFile);
          break;
        case 'helm':
          renderHelm(directory, configFile);
          break;
      }
    } else {
      console.log('Konfiguracni soubor nema validni format');
      console.log('Chyby:', validate.errors);
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

function renderJson(directory, configFile, result = Boolean) {
  const config = yaml.load(fs.readFileSync(configFile, 'utf8'));
  console.log('Renderovani z JSON souboru podle konfigurace', configFile);
}

function renderHelm(directory, configFile, result = Boolean) {
  const config = yaml.load(fs.readFileSync(configFile, 'utf8'));
  console.log('Renderovani helmchartou podle konfigurace', configFile);
}

module.exports = {
  render,
  renderJson,
  renderHelm,
};