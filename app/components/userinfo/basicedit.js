'use strict';

angular.module('com.pupil.app')
.controller('BasiceditController',['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
	
	$scope.editState = {
		editSuccess : false,
		editFail : false
	};
		
	$scope.getInfo = function() {	
		 var userInfo = $window.sessionStorage["userInfo"];
//		 console.log(userInfo);
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
    
	$scope.save = function(){
		 var userInfo = $window.sessionStorage["userInfo"];
		 var data_edit={};
        data_edit = (userInfo+JSON.stringify($scope.user)).replace(/}{/,',');
        
		console.log(data_edit);
		$http({
			method:'POST',
			url :HOST+'/User/edit',
			data:data_edit 
		}).success(function(data,status,headers,config) {
				if(data.status==0){			
					$scope.editState.editFail = false;
					$scope.editState.editSuccess = true;	
					//console.log(data);
				}else {					
					$scope.editState.editFail = true
					$scope.editState.editSuccess = false;
					
					console.log("验证错误");
				}								
			}).error(function(data,status,headers,config) {							
				console.log("error");				
			});	
	}

 
}]);
angular.module('com.pupil.app').directive('pBasicedit', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/basicedit.html',
    controller: 'BasiceditController'
  };
});
