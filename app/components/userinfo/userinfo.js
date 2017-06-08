'use strict';
//userinfo.js
angular.module('com.pupil.app')
.controller('UserinfoController',['$scope','$http','HOST','$window','$rootScope','AUTH_EVENTS',
function ($scope,$http,HOST,$window,$rootScope,AUTH_EVENTS) {
	$scope.actives = {
        infodisplay: 'active',
        basicedit: '',
        passwordedit: ''              
    };
    $scope.tabs = "infodisplay";
    $scope.select = function(type) {
        $scope.tabs = type;
        for (var key in $scope.actives) {
            if (key == type) {
                $scope.actives[key] = 'active';
            } else {
                $scope.actives[key] = '';
            }
       }
    };
 }   
]);
    

angular.module('com.pupil.app').directive('pUserinfo', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/userinfo.html',
    controller: 'UserinfoController'
  };
});
