'use strict';

angular.module('com.pupil.app').
controller('MeasurelistController', ['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
  $scope.getData = function(){
  	 var userInfo = $window.sessionStorage["userInfo"];
  	 console.log(userInfo);
  	$http({
			method: 'POST',
			url: HOST+'/Measure/getAll',			
			data: {
				accountNumber : userInfo.accountNumber,
				passwordEncoded : userInfo.password
			}
			}).success(function(data,status,headers,config) {
				console.log(data);
				if(data.status==0){					
					$scope.lists=data.measures;	
					console.log(data);
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
