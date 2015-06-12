var angular = require('angular');

angular.module(
  'app',
  [
    'ngResource',
    'ngRoute',
    'core',
    'organizations'
  ]
);

require('./templates');
require('./config');

// Modules
require('../../core/public/module');
require('../../organizations/public/module');

// Finally, bootstrap the angular app
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
});

