angular.module('core').controller(
  'CoreController',
  [
    '$scope',
    'Authentication',
    function($scope, Authentication) {
      if (Authentication.user) {
        $scope.email = Authentication.user.email;
      } else {
        $scope.email = 'MEAN Application';
      }
    }
  ]
);
