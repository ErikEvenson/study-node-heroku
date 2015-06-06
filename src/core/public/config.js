angular.module('core').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'public/core/views/core.public.views.index.html'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
]);
