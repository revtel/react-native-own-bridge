let exec = require('shelljs').exec;
let fs = require('fs');
let _mainApplicationJava = null;

function getMainApplicationJavaFile() {
  return new Promise((resolve, reject) => {
    if (_mainApplicationJava) {
      resolve(_mainApplicationJava);
    }

    exec('grep -rl "implements ReactApplication" android/app/src/main/java', function (code, stdout, stderr) {
      if (code === 0 && stdout) {
        _mainApplicationJava = stdout.trim();
        resolve(_mainApplicationJava);
      } else {
        reject();
      }
    })
  });
}

function editMainApplicationJava(data) {
  return getMainApplicationJavaFile()
    .then(mainAppJava => {
      let text;
      text = fs.readFileSync(mainAppJava, 'utf-8');
      text = text.replace(
        /(new MainReactPackage\(\))/, 
        `$1, new ${data.moduleName}Package()`
      );
      text = text.replace(
        /(import com.facebook.react.shell.MainReactPackage;)/, 
        `$1\nimport ${data.androidPkg}.${data.moduleName}Package;`
      );
      fs.writeFileSync(mainAppJava, text); 
    })
    .catch(err => {
      console.warn(err);
    })
}

module.exports = {
    postProcessing: editMainApplicationJava
}