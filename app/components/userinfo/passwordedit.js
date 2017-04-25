'use strict';

angular.module('com.pupil.app')
.controller('PasswordeditController', ['$scope','$http','HOST','$window','$timeout',
function ($scope,$http,HOST,$window,$timeout) {
	$scope.editState = {
		editSuccess : false,
		editFail : false
	};
	var timer=null;
	$scope.save = function(){
		 var userInfo = $window.sessionStorage["userInfo"];
		$http({
			method:'POST',
			url :HOST+'/User/edit',
			data:{
				"accountNumber" : userInfo.accountNumber,
				"passwordEncoded" : userInfo.passwordEncoded,
				"newPassword" : $scope.user.newPassword
			}
		}).success(function(data,status,headers,config) {
				if(data.status==0){				
					$scope.editState.editFail = false;
					$scope.editState.editSuccess = true;
					
					timer=$timeout(function(){
						$state.go('login');
						},3000);
					//console.log(data);
				}else {
					$scope.editState.editSuccess = false;
					$scope.editState.editFail = true;
					//console.log("验证错误");
				}								
			}).error(function(data,status,headers,config) {							
				console.log("error");				
			});	
	};
	
	$scope.$on("$destroy",function( event ) {
                $timeout.cancel( timer );
	});
	

 
}]);
angular.module('com.pupil.app').directive('pPasswordedit', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/passwordedit.html',
    controller: 'PasswordeditController'
  };
});
