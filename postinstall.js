var fs = require('fs');
var path = require('path');

var dirname = __dirname.replace(/\\/g, '/');
var index = dirname.lastIndexOf('/node_modules/');
var root;
if (index >= 0) {
  root = path.resolve(dirname.slice(0, index));
} else {
  root = dirname
}
var link = root + '/node_modules/~';
try {
  var existingReal = path.resolve(fs.realpathSync(link));
} catch (e) {
  fs.mkdirSync(root + '/node_modules')
  fs.symlinkSync(root, link, 'junction');
  process.exit(0);
}
if (existingReal && existingReal !== root) {
  throw new Error(link + ' is already being used');
}
