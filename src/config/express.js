var
  compression = require('compression'),
  bodyParser = require('body-parser'),
  express = require('express'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  path = require('path');

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

  // Set up view engines
  viewPaths = [
    path.join(__dirname, '../core/server/views')
  ];
  
  app.set('views', viewPaths);
  app.set('view engine', 'jade');

  // Set up routes
  require('../core/server/routes/core.routes.server.js')(app);

  return app;
};
