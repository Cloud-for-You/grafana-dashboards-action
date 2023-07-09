const fs = require('fs');
const yaml = require('js-yaml');

// Priprava pro validaci vstupnich dat
const Ajv = require('ajv');
const jsonSchema = require('./schema.json');
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);

function render(confFile, result = Boolean) {
  console.log("Zpracovavam konfiguracni soubor", confFile);
  const config = yaml.load(fs.readFileSync(confFile, 'utf8'));
  const indentedJson = JSON.stringify(config, null, 4);

  try {
    // Provedeme validaci ENV oproti Schematu
    const valid = validate(config);
    if (valid) {
      switch (config.type) {
        case 'json':
          renderJson(config);
          break;
        case 'helm':
          renderHelm(config);
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

function renderJson(config, result = Boolean) {
  console.log('Renderovani JSON souboru')
}

function renderHelm(config, result = Boolean) {
  console.log('Renderovani helmchartou')
}

module.exports = {
  render,
  renderJson,
  renderHelm,
};