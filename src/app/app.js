var angular = require('angular');

angular.module(
  'app',
  [
    'ngResource',
    'ngRoute',
    'users'
  ]
);

require('./templates');
require('./config');

// Modules
require('../users/module');

// Finally, bootstrap the angular app
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
});

