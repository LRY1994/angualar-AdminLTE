'use strict';

angular.module('com.pupil.app').
controller('MeasurelistController', ['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
	
  var token = $window.sessionStorage["token"].replace(/\"/g,'');
	$scope.fromTime='';
	$scope.toTime='';
	//格式化时间
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
	
  $scope.getData = function(){
  	console.log($scope.fromTime);
  	console.log($scope.toTime);
  	$http({
		method: 'POST',
		url: HOST+'/api/'+token+'/data',			
		data:{
			fromTime:$scope.fromTime,
			toTime:$scope.toTime
		}
		}).success(function(data,status,headers,config) {								
			var lists=data.measures;	
			angular.forEach(lists,function(data, index, array){                  		
				data.commitTime= $scope.formatTime(data.commitTime);						
			});
			$scope.lists=lists;
			
			}).error(function(data,status,headers,config) {							
				console.log("error");				
			});		
  };
  
  $scope.query = function(){
  	console.log('aaa');
  	 $scope.getData();
  }
 
  $scope.getData();
 
}]);
angular.module('com.pupil.app').directive('pMeasurelist', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/measurelist.html',
    controller: 'MeasurelistController'
  };
});
