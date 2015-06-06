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

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
