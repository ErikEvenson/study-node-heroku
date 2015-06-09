angular.module('organizations').config(['$routeProvider',
  function($routeProvider) {
    var base = 'public/organizations/views/';

    $routeProvider
      .when('/organizations', {
        templateUrl: base + 'organizations.public.views.list.html'
      })
      .when('/organizations/create', {
        templateUrl: base + 'organizations.public.views.create.html'
      })
      .when('/organizations/:organizationId', {
        templateUrl: base + 'organizations.public.views.view.html'
      })
      .when('/organizations/:organizationId/edit', {
        templateUrl: base + 'organizations.public.views.edit.html'
      });
  }
]);
