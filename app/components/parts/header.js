'use strict';

angular.module('com.pupil.app').controller('HeaderController', ['$scope','$state','$rootScope',
function ($scope,$state,$rootScope) {
  $scope.logout = function(){  
  	$rootScope.logout();
  	$state.go("login");
  }
}]);
angular.module('com.pupil.app').directive('pHeader', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/parts/header.html',
    controller: 'HeaderController'
  };
});
