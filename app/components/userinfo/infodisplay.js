'use strict';

angular.module('com.pupil.app')
.controller('InfodisplayController',['$scope','$http','HOST','$window','$state',
function ($scope,$http,HOST,$window,$state) {
	
	$scope.getInfo = function() {	
		 var token = JSON.parse($window.sessionStorage["userInfo"]).token;
		$http({
			method: 'GET',
			url: HOST+'/api/'+token						
			}).success(function(data,status,headers,config) {
				//console.log(data);									
				$scope.user=data.user;	
					
			}).error(function(data,status,headers,config) {	
				if(status==401)$state.go("login");
				else {console.log("get info error");}			
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
