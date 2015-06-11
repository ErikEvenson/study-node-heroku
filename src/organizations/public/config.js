angular.module('organizations').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/organizations', {
        templateUrl: 'organizations.public.views.list.html'
      })
      .when('/organizations/create', {
        templateUrl: 'organizations.public.views.create.html'
      })
      .when('/organizations/:organizationId', {
        templateUrl: 'organizations.public.views.view.html'
      })
      .when('/organizations/:organizationId/edit', {
        templateUrl: 'organizations.public.views.edit.html'
      });
  }
]);
