angular.module('organizations').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/organizations', {
      templateUrl: 'public/organizations/views/organizations.public.views.list.html'
    }).
    when('/organizations/create', {
      templateUrl: 'public/organizations/views/organizations.public.views.create.html'
    }).
    when('/organizations/:organizationId', {
      templateUrl: 'public/organizations/views/organizations.public.views.view.html'
    }).
    when('/organizations/:organizationId/edit', {
      templateUrl: 'public/organizations/views/organizations.public.views.edit.html'
    });
  }
]);
