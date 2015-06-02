
var express = require('express');

/**
  * @return {Object} - Application.
 */

module.exports = function() {
  var app = express();

  // app.use(express.static(__dirname + '/../public'));

  require('../core/server/routes/core.routes.server.js')(app);

  return app;
};
