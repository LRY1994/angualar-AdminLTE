'use strict';

angular.module('com.pupil.app')
.controller('InfodisplayController',['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
	
	$scope.getInfo = function() {	
		 var userInfo = $window.sessionStorage["userInfo"];
		 //console.log(userInfo);
		$http({
			method: 'POST',
			url: HOST+'/User/display',			
			data: userInfo
			}).success(function(data,status,headers,config) {
				//console.log(data);
				if(data.status==0){					
					$scope.user=data.user;	
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
