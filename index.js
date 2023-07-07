const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  fs.readdirSync(workingDir).forEach(file => {
    console.log(file);
  });
    
  console.log("Working directory:", workingDir);

  
  const envFile = core.getInput('env-file-name');
  console.log("File from environments:", envFile);
  const tmpDir = core.getInput('tmp-directory');
  console.log("Temporary directory k8s manifests:", tmpDir);

  // Set Output
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);
} catch (error) {
  core.setFailed(error.message)  
}