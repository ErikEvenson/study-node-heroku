var
  compression = require('compression'),
  bodyParser = require('body-parser'),
  environment = require('./environment'),
  express = require('express'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  passport = require('passport'),
  path = require('path'),
  session = require('express-session');

/**
  * @return {Function} - The express application.
 */

module.exports = function() {
  var app = express();
  var instancePath = path.join(__dirname, '../..');

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
    path.join(instancePath, 'app/views'),
    path.join(instancePath, 'core/views'),
    path.join(instancePath, 'organizations/views')
  ];

  app.set('views', viewPaths);
  app.set('view engine', 'jade');

  // Set up connect-flash
  app.use(flash());

  // Set up passport authentication
  app.use(passport.initialize());
  app.use(passport.session());

  // Set up routes
  require(path.join(instancePath, 'app/routes/app'))(app);
  require(path.join(instancePath, 'core/routes/users'))(app);
  require(path.join(instancePath, 'organizations/routes/organizations'))(app);

  // Serve static assets
  app.use('/app/public', express.static(path.join(instancePath, 'app/public')));

  return app;
};
