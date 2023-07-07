const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  console.log("Working directory: " + workingDir);
  const tmpDir = core.getInput('tmp-directory');
  console.log("Temporary directory k8s manifests" + tmpDir);

  // Set Output
  const time = (new Date()).toTimeString();
  core.setOutput('time', time);


} catch (error) {
  core.setFailed(error.message)  
}