'use strict';

angular.module('com.pupil.app')
.controller('InfodisplayController',['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
	
	$scope.getInfo = function() {	
		
		$http({
			method: 'POST',
			url: HOST+'/User/display',			
			data: $window.sessionStorage["userInfo"]
			}).success(function(data,status,headers,config) {
				if(data.status==0){					
					$scope.user=data.user;	
					console.log(data);
				}else {
					console.log("验证错误");
				}								
			}).error(function(data,status,headers,config) {							
				console.log("error");				
			});		
	};
	
	
    $scope.getInfo();
    
   }
]);
    

angular.module('com.pupil.app').directive('pInfodisplay', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/infodisplay.html',
    controller: 'InfodisplayController'
  };
});
