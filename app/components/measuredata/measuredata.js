'use strict';

angular.module('com.pupil.app').
controller('MeasuredataController', ['$scope','$http','HOST','$window','$rootScope','AUTH_EVENTS','$state',
function ($scope,$http,HOST,$window,$rootScope,AUTH_EVENTS,$state) {
    $scope.actives = {
        table: 'active',
        chart: ''                     
    };
    
    $scope.tabs = "table";
    $scope.fromTime="";
	$scope.toTime="";
	
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
    
    $scope.formatTime = function(time) {
                var timeStamp = new Date(parseInt(time)),
                    month = timeStamp.getMonth() + 1,
                    date = timeStamp.getDate() < 10 ? '0' + timeStamp.getDate() : timeStamp.getDate(),
                    hour = timeStamp.getHours() < 10 ? '0' + timeStamp.getHours() : timeStamp.getHours(),
                    minute = timeStamp.getMinutes() < 10 ? '0' + timeStamp.getMinutes() : timeStamp.getMinutes(),
                    second = timeStamp.getSeconds() < 10 ? '0' + timeStamp.getSeconds() : timeStamp.getSeconds();
                return month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    };
    
    $scope.query = function(){
    	$scope.$broadcast("updateData");
    }
}]);
angular.module('com.pupil.app').directive('pMeasuredata', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/measuredata/measuredata.html',
    controller: 'MeasuredataController'
  };
});
