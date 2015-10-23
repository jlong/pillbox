(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    $scope.hello = "Hello world!";
  }
})();
