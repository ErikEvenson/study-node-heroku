angular.module('core').factory('Authentication', [
  function() {
    this.user = JSON.parse(window.user);

    return {
      user: this.user
    };
  }
]);
