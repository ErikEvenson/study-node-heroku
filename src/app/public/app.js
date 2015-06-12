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

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app'], {
    strictDi: true
  });
});

require('./templates');
require('./config');

// Modules
require('../../core/public/module');
require('../../organizations/public/module');
