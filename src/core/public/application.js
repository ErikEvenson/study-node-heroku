var mainApplicationModuleName = 'study-node-heroku';

var mainApplicationModule = angular.module(
  mainApplicationModuleName,
  ['ngRoute', 'core']
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
