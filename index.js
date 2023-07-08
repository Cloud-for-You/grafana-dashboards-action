// Knihovny pro nutnost behu jako github actions
const core = require('@actions/core');
const github = require('@actions/github');

// Potrebne knihovny
const path = require('path');

// Nacteme lokalni knihovny
const confFiles = require('./lib/searchConfig');
const manifests = require('./lib/renderManifests');

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  console.log("Working directory:", path.resolve(workingDir));
  const confFile = core.getInput('env-file-name');
  console.log("File from environments:", confFile);
  const tmpDir = core.getInput('tmp-directory');
  console.log("Temporary directory k8s manifests:", tmpDir);

  const foundConfFile = confFiles.getConfFiles(workingDir, confFile);

  console.log("Found files:");
  if (foundConfFile.length > 0) {
    for (const confFile of foundConfFile) {
      // spustime vykonny kod pro renderovani
      // Scriptu, predlozime vyhledany ENV soubor, ktery si modul rozparsuje a nasledne vygeneruje
      // k8s manifesty a vlozi do nej dashboard z uvedeneho zdroje
      manifests.init(confFile);
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