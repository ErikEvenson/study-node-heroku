var
  path = require('path');

module.exports = {
  basepath: path.join(__dirname, '..'),
  instances: path.join(__dirname, '../instances'),
  secrets: path.join(__dirname, '../secrets')
};