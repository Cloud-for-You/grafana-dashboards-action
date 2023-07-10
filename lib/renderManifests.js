const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const buffer = require('buffer');
const zlib = require('zlib');
const uuid = require('uuid');


// Priprava pro validaci vstupnich dat
const Ajv = require('ajv');
const jsonSchema = require('./schema.json');
const ajv = new Ajv();
const validate = ajv.compile(jsonSchema);

function init(workingDir, configFile, tmpDir) {
  const directory = path.dirname(configFile);
  const config = yaml.load(fs.readFileSync(configFile, 'utf8'));

  try {
    // Provedeme validaci ENV oproti Schematu
    const valid = validate(config);
    
    // Renderujeme funkci podle typu uvedeneho v konfiguracnim souboru
    if (valid) {
      switch (config.type) {
        case 'json':
          // Do pole nacteme vsechny JSON, ktere pote zacneme renderovat
          const jsonsInDir = fs.readdirSync(path.dirname(configFile)).filter(file => path.extname(file) === '.json');
          for (const jsonFile of jsonsInDir) {
            const dir = path.dirname(configFile).replace(workingDir + '/', '');
            if (!fs.existsSync(tmpDir + '/' + dir)) {
              fs.mkdirSync(tmpDir + '/' + dir, { recursive: true });
            }
            const name = (dir + '/' + jsonFile.toLowerCase().replace('.json', '')).replace(/[/_]/g, '-').toLowerCase();

            // Pripravime si data pro zapis do manifestu
            const stringData = fs.readFileSync((path.dirname(configFile) + '/' + jsonFile), 'utf8');
            const gzipData = zlib.gzipSync(stringData);
            const base64Data = gzipData.toString('base64');

            // Nechame vyrenderovat manifest
            const k8s_manifest = renderManifest(name, base64Data, config);
            // manifest ulozime do souboru
            fs.writeFileSync(tmpDir + '/' + dir + '/' + uuid.v4() + '.json', JSON.stringify(k8s_manifest, null, 4), 'utf-8');
          }
          break;
        case 'helm':
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

function renderManifest(name, data, config, result = Object) {
  const grafanaFolder = config.grafana_folder;

  const k8s_manifest = new Object();

  k8s_manifest.apiVersion = 'grafana.integreatly.org/v1beta1';
  k8s_manifest.kind = 'GrafanaDashboard';
  k8s_manifest.metadata = new Object();
  k8s_manifest.metadata.name = name;
  k8s_manifest.metadata.labels = 'app.kubernetes.io/instance: grafana-csas'
  k8s_manifest.spec = new Object();
  k8s_manifest.spec.folder = grafanaFolder;
  k8s_manifest.spec.gzipJson = data;
  return k8s_manifest;
}

module.exports = {
  init
};