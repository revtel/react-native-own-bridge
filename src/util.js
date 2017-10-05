let fs = require('fs'),
  ejs = require('ejs');

function genFileFromTemplate(inFile, outFile, data) {
  let raw, template, out;
  raw = fs.readFileSync(inFile, 'utf-8');
  template = ejs.compile(raw);
  out = template(data);
  fs.writeFileSync(outFile, out);
}

function promisify(fn) {
  return new Promise(fn);
}

module.exports = {
  genFileFromTemplate,
  promisify
}
