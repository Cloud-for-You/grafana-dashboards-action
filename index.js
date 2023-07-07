const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');

function searchEnvFile(directory, fileName, result = []) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      searchEnvFile(filePath, fileName, result);
    } else if (stats.isFile() && file === fileName) {
      result.push(filePath);
    }
  }

  return result;
}

try {
  // Get Input
  const workingDir = core.getInput('working-directory');
  console.log("Working directory:", workingDir); 
  const envFile = core.getInput('env-file-name');
  console.log("File from environments:", envFile);
  const tmpDir = core.getInput('tmp-directory');
  console.log("Temporary directory k8s manifests:", tmpDir);

  const foundFiles = searchEnvFile(workingDir, envFile);

  if (foundFiles.length > 0) {
    console.log('Searching env files:');
    for (const file of foundFiles) {
      console.log(file);
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