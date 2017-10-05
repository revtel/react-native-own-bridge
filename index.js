#!/usr/bin/env node

let exec = require('shelljs').exec;
let util = require('./src/util');
let android = require('./src/platforms/android');
let ios = require('./src/platforms/ios');
let program = require('commander');
var readJson = require('read-package-json')
var colors = require('colors');

const DefaultModuleName = 'MyNativeModule';
const DefaultPackageName = 'com.me.nativemodule';
 
program
  .version('0.0.1')
  .option('-n, --name [moduleName]', 'specify native module name, default to ' + DefaultModuleName, DefaultModuleName)
  .option('-p, --package [androidPackageName]', 'specify Android package name, default to ' + DefaultPackageName, DefaultPackageName)
  .parse(process.argv);

let templateFiles = [
  'bridge.js',  
  'ios.m',  
  'ios.h',
  'AndroidPackage.java',  
  'AndroidModule.java',
];

let data = {
  rnVersion: null,
  moduleName: program.name,
  androidPkg: program.package,
  iosSrcPath: null,
  androidSrcPath: null,
};

function getOutputFile(filename, context) {
  let {androidPkg, moduleName, iosSrcPath, androidSrcPath} = context;
  if (filename === 'bridge.js') {
    return `./${moduleName}.js`; 
  } else if (filename === 'ios.m') {
    return `${iosSrcPath}/${moduleName}.m`;
  } else if (filename === 'ios.h') {
    return `${iosSrcPath}/${moduleName}.h`;
  } else if (filename === 'AndroidPackage.java') {
    return `${androidSrcPath}/${moduleName}Package.java`;
  } else if (filename === 'AndroidModule.java') {
    return `${androidSrcPath}/${moduleName}.java`;
  }
}

function getReactNativeInfo() {
  return new Promise((resolve, reject) => {
    readJson('./node_modules/react-native/package.json', console.error, false, function (err, data) {
      if (err) {
        reject("There was an error reading the file")
      } else {
        resolve(data)
      }
    })
  });
}

getReactNativeInfo()
  .then(rnInfo => {
    data.rnVersion = parseInt(rnInfo.version.split('.')[1]);
  })
  .then(ios.getAppDelegateFile) // ios setup, find the directory for AppDelegate.m
  .then(appDelegate => {
    data.iosSrcPath = appDelegate.split('/').slice(0, -1).join('/');
  })
  .then(() => { // android setup, create the source path according to package name
    data.androidSrcPath = `./android/app/src/main/java/${data.androidPkg.split('.').join('/')}`;
    exec(`mkdir -p ${data.androidSrcPath}`);
  })
  .then(() => { // generate native module related files
    templateFiles.forEach(f => {
      let inFile = `${__dirname}/templates/${f}`;
      let outFile = getOutputFile(f, data);
      util.genFileFromTemplate(inFile, outFile, data);
    });
  })
  // do platform specific post processing 
  .then(() => android.postProcessing(data))
  .then(() => ios.postProcessing(data))
  .then(() => {
    console.log(
      '\nCongratulations!\nNative module ' + data.moduleName.green + 
      ' has been successfully created, happy native coding!\n');
  })
  .catch(err => console.error(err))
