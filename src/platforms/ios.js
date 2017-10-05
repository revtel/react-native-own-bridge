let exec = require('shelljs').exec;
let fs = require('fs');
let _appDelegateFile = null;

function getAppDelegateFile() {
  return new Promise((resolve, reject) => {
    if (_appDelegateFile) {
      resolve(_appDelegateFile);
      return;
    }  

    exec('find ios -name AppDelegate.m', function (code, stdout, stderr) {
      if (code === 0 && stdout) {
        _appDelegateFile = stdout.trim()
        resolve(_appDelegateFile);
      } else {
        reject();
      }
    })
  });
}

function editAppDelegateFile(data) {
  return getAppDelegateFile()
    .then(appDelegateFile => {
      let text;
      text = fs.readFileSync(appDelegateFile, 'utf-8');
      text = text.replace(
        /(#import "AppDelegate.h")/, 
        `$1\n#import "${data.moduleName}.m"`
      );
      fs.writeFileSync(appDelegateFile, text); 
    })
    .catch(err => {
      console.warn(err);
    })
}

module.exports = {
  postProcessing: editAppDelegateFile,
  getAppDelegateFile
}