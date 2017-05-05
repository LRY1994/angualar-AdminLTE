'use strict';

angular.module('com.pupil.app').
controller('MeasurelistController', ['$scope','$http','HOST','$window','$state',
function ($scope,$http,HOST,$window,$state) {
//	startDate = new Date(new Date().toLocaleDateString()).getTime();
//  endDate = new Date().getTime();
	var token = JSON.parse($window.sessionStorage["userInfo"]).token;
    
	
	$scope.fromTime="";
	$scope.toTime="";
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
  
  	var fromTime,toTime;
  	if($scope.fromTime==""){
  		fromTime="";
  	}else {
  		fromTime=new Date($scope.fromTime).getTime();
  	}
  	if($scope.toTime==""){
  		toTime="";
  	}else{//1天(d)=86400000毫秒(ms)
  		toTime=new Date($scope.toTime).getTime()+86400000;
  	}
  	 	
  	$http({
		method: 'GET',
		url: HOST+'/api/'+token+'/data',			
		params:{
			fromTimeMills:fromTime,
			toTimeMills:toTime
		}
		}).success(function(data,status,headers,config) {
			
			var lists=data.measures;	
			angular.forEach(lists,function(data, index, array){                  		
				data.commitTime= $scope.formatTime(data.commitTime);						
			});
			$scope.lists=lists;
			
			}).error(function(data,status,headers,config) {
				if(status==404){
					$scope.lists=[];
				}
				else if(status==401){
					$state.go("login");
				}
				else{
					console.log("get data error");
				}
			});		
  };
  
  $scope.query = function(){ 	
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
