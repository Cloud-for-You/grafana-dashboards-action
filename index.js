// Knihovny pro nutnost behu jako github actions
const core = require('@actions/core');
const github = require('@actions/github');

// Nacteme lokalni knihovny
const configs = require('./lib/configs');
const manifests = require('./lib/renderManifests');

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  const configFile = core.getInput('config-file-name');
  const tmpDir = core.getInput('tmp-directory');
  const foundConfigFile = configs.getConfigFiles(workingDir, configFile);

  console.log("Found files:");
  if (foundConfigFile.length > 0) {
    for (const configFile of foundConfigFile) {
      // spustime vykonny kod pro renderovani
      // Scriptu, predlozime vyhledany ENV soubor, ktery si modul rozparsuje a nasledne vygeneruje
      // k8s manifesty a vlozi do nej dashboard z uvedeneho zdroje
      manifests.render(configFile);
    }
  } else {
    console.log('Files is not found.');
  }


  // Set Output
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);
} catch (error) {
  core.setFailed(error.message)  
}