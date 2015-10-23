(function() {
  'use strict';

  angular
    .module('pillbox', [])
    .directive('pillbox', PillboxDirective);

  /** @ngInject */
  function PillboxDirective() {
    return {
      restrict: 'E',

      scope: {
      },

      templateUrl: 'app/components/pillbox/pillbox.html',

      link: function($scope, $element, $attrs) {
      }
    };
  }
})();
