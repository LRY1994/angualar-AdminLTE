'use strict';

angular.module('com.pupil.app')
.controller('InfodisplayController',['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
	
	$scope.getInfo = function() {	
		 var token = $window.sessionStorage["token"].replace(/\"/g,'');
		 console.log(token);
		 console.log(HOST+'/api/'+token);
		$http({
			method: 'GET',
			url: HOST+'/api/'+token,						
			}).success(function(data,status,headers,config) {
				//console.log(data);									
				$scope.user=data.user;	
					
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
