var
  angular = require('angular'),
  mainApplicationModuleName = 'study-node-heroku';

var mainApplicationModule = angular.module(
  mainApplicationModuleName,
  [
    'ngResource',
    'ngRoute',
    'core',
    'organizations'
  ]
);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

// Solves a Facebook OAuth issue...
if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
