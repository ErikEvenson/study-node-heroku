angular.module('core').factory('Authentication', [
  function() {
    if (window.user) {
      this.user = JSON.parse(window.user);
    } else {
      this.user = null;
    }

    return {
      user: this.user
    };
  }
]);
