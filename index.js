// Knihovny pro nutnost behu jako github actions
const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const path = require('path');

// Nacteme lokalni knihovny
const render = require('./lib/renderManifests');

// Funkce
function getConfigFiles(directory, fileName, result = []) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      getConfigFiles(filePath, fileName, result);
    } else if (stats.isFile() && file === fileName) {
      result.push(filePath);
    }
  }
  return result;
}

try {
  // testovaci vstupy
  /*
  const workingDir = '../grafana-dashboards';
  const configFile = 'config.yaml';
  const tmpDir = '/tmp/k8s_manifests';
  */

  // Ziskani vstupu z github actions
  const workingDir = core.getInput('working-directory');
  const configFile = core.getInput('config-file-name');
  const tmpDir = core.getInput('tmp-directory');

  // Pripravime si tmp directory pokud neexistuje
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const foundConfigFile = getConfigFiles(workingDir, configFile);

  //console.log("Found files:");

  if (foundConfigFile.length > 0) {
    for (const configFile of foundConfigFile) {
      // spustime vykonny kod pro renderovani
      // Scriptu, predlozime vyhledany ENV soubor, ktery si modul rozparsuje a nasledne vygeneruje
      // k8s manifesty a vlozi do nej dashboard z uvedeneho zdroje
      const k8s_manifest = render.init(workingDir, configFile, tmpDir);
    }
  } else {
    console.log('Config file not found.');
  }

  // Set Output
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);
} catch (error) {
  core.setFailed(error.message)  
}