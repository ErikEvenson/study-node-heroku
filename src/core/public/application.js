var mainApplicationModuleName = 'study-node-heroku';
var mainApplicationModule = angular.module(mainApplicationModuleName, []);

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
