'use strict';

angular.module('com.pupil.app').controller('HeaderController', function () {
 
});
angular.module('com.pupil.app').directive('pHeader', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/header.html',
    controller: 'HeaderController'
  };
});
