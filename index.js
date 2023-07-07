// Knihovny pro nutnost behu jako github actions
const core = require('@actions/core');
const github = require('@actions/github');

// Potrebne knihovny
const path = require('path');

// Nacteme lokalni knihovny
const files = require('./lib/files');

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  console.log("Working directory:", path.resolve(workingDir));
  const envFile = core.getInput('env-file-name');
  console.log("File from environments:", envFile);
  const tmpDir = core.getInput('tmp-directory');
  console.log("Temporary directory k8s manifests:", tmpDir);

  const foundFiles = files.getFiles(workingDir, envFile);

  console.log("Found files:");
  if (foundFiles.length > 0) {
    for (const file of foundFiles) {
      console.log(" ", file);
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