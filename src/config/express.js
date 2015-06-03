var
  compression = require('compression'),
  bodyParser = require('body-parser'),
  express = require('express'),
  methodOverride = require('method-override'),
  morgan = require('morgan');

/**
  * @return {Object} - Application.
 */

module.exports = function() {
  var app = express();

  // app.use(express.static(__dirname + '/../public'));

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compression({
      threshold: 1024
    }));
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());
  app.use(methodOverride());

  require('../core/server/routes/core.routes.server.js')(app);

  return app;
};
