var
  compression = require('compression'),
  bodyParser = require('body-parser'),
  environment = require('./environment'),
  express = require('express'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  path = require('path'),
  session = require('express-session');

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

  // Set up express-session
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: environment.sessionSecret
  }));

  // Set up view engines
  viewPaths = [
    path.join(__dirname, '../core/server/views')
  ];

  app.set('views', viewPaths);
  app.set('view engine', 'jade');

  // Set up routes
  require('../core/server/routes/core.routes.server.js')(app);

  // Serve static assets
  app.use(
    '/public/core',
    express.static(path.join(__dirname, '../core/public'))
  );

  return app;
};
