'use strict';

angular.module('com.pupil.app').
controller('MeasuredataTableController', ['$scope','$http','HOST','$window','$rootScope','AUTH_EVENTS','$state',
function ($scope,$http,HOST,$window,$rootScope,AUTH_EVENTS,$state) {
	var token = JSON.parse($window.sessionStorage["userInfo"]).token;
	$scope.formatTime = function(time) {
                var timeStamp = new Date(parseInt(time)),
                    year = timeStamp.getFullYear(),
                    month = timeStamp.getMonth() + 1,
                    date = timeStamp.getDate() < 10 ? '0' + timeStamp.getDate() : timeStamp.getDate(),
                    hour = timeStamp.getHours() < 10 ? '0' + timeStamp.getHours() : timeStamp.getHours(),
                    minute = timeStamp.getMinutes() < 10 ? '0' + timeStamp.getMinutes() : timeStamp.getMinutes(),
                    second = timeStamp.getSeconds() < 10 ? '0' + timeStamp.getSeconds() : timeStamp.getSeconds();
                return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
    };
	$scope.getData = function() {

 	var bfromTime, btoTime;
 	var lists = [];
 	if($scope.fromTime == "") {
 		bfromTime = "";
 	} else {
 		bfromTime = new Date($scope.fromTime).getTime();
 	}
 	if($scope.toTime == "") {
 		btoTime = "";
 	} else { //1天(d)=86400000毫秒(ms)
 		btoTime = new Date($scope.toTime).getTime() + 86400000;
 	}

 	$http({
 		method: 'GET',
 		url: HOST + '/api/' + token + '/data',
 		params: {
 			fromTimeMills: bfromTime,
 			toTimeMills: btoTime
 		}
 	}).success(function(data, status, headers, config) {

 		lists = data.measures;
 		$scope.loadData2Table(lists);

 	}).error(function(data, status, headers, config) {
 		if(status == 404) {
 			
 			$scope.lists=[];
 			
 		} else if(status == 401) {
 			$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);

 		} else {
 			console.log("get data error");
 		}
 	});
 	
 	
 };
	$scope.loadData2Table = function(datalists){		
		angular.forEach(datalists,function(data, index, array){                  		
				data.commitTime= $scope.formatTime(data.commitTime);						
			});
		$scope.lists=datalists;
		
	}
    
    $scope.getData();
    
 
}]);
angular.module('com.pupil.app').directive('pMeasuredataTable', function () {
  return {
    restrict: 'EA',
    scope: {
    	fromTime:"=fromTime",
    	toTime:"=toTime",   	
    	formatTime:"&"
    	
    },
    templateUrl: 'components/measuredata/measuredata.table.html',
    controller: 'MeasuredataTableController'
  };
});
