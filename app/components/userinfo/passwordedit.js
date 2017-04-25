'use strict';

angular.module('com.pupil.app')
.controller('PasswordeditController', ['$scope','$http','HOST','$window',
function ($scope,$http,HOST,$window) {
	$scope.save = function(){
		 var userInfo = $window.sessionStorage["userInfo"];
		$http({
			method:'POST',
			url :HOST+'/User/edit',
			data:{
				accountNumber : userInfo.accountNumber,
				passwordEncoded : userInfo.password,
				newPassword
			}
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
	}
	

 
}]);
angular.module('com.pupil.app').directive('pPasswordedit', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/passwordedit.html',
    controller: 'PasswordeditController'
  };
});
