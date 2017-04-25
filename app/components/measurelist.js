'use strict';

angular.module('com.pupil.app').
controller('MeasurelistController', ['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
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
  	 var userInfo = $window.sessionStorage["userInfo"];
  	 console.log(userInfo);
  	$http({
			method: 'POST',
			url: HOST+'/Measure/getAll',			
			data: userInfo
			}).success(function(data,status,headers,config) {
				//console.log(data);
				if(data.status==0){					
					var lists=data.measures;	
					angular.forEach(lists,function(data, index, array){                  		
						data.commitTime= $scope.formatTime(data.commitTime);
						
					});
					$scope.lists=lists;
					
					
					//console.log(data);
				}else if(data.status==1){
					console.log("读取失败");
				}else if(data.status==3){
					console.log("验证失败");
				}
			}).error(function(data,status,headers,config) {							
				console.log("error");				
			});		
  };
  
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
