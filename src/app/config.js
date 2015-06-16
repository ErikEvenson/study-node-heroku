require('angular-resource');
require('angular-route');

angular.module('app').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app.views.index.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
]);

angular.module('app').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

// Solves a Facebook OAuth issue...
if (window.location.hash === '#_=_') window.location.hash = '#!';
