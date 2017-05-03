'use strict';

angular.module('com.pupil.app')
.controller('RegisterController', [ '$scope', '$state','$http','$timeout','HOST', '$window',
function($scope, $state,$http,$timeout,HOST,$window) {
	$scope.credentials = {};
	$scope.registerForm = {};
	$scope.error = false;
	var timer=null;
	
	$scope.registerState = {
		userExist:false,
		regFail:false,
		regSuccess:false
	}
	
	//when the form is submitted
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.registerForm.$invalid) {
			$scope.register($scope.credentials);
		} else {
			$scope.error = true;
			return;
		}
	};

	//Performs the login function, by sending a request to the server with the Auth service
	$scope.register = function(credentials) {
		$scope.error = false;
		$http({
			method: 'POST',
//			url: HOST+'/User/join',
			url: HOST+'/api/user',
			//换成查询字符串追加在URL后面
			data: {
				'accountNumber': credentials.accountNumber,
				'password':credentials.password,
				'userName':credentials.userName,
				'phone':credentials.phone,
				'relativeName':credentials.relativeName,
				'relativePhone':credentials.relativePhone,
				'email':credentials.email
//				'gender':credentials.gender
			}
			}).success(function(data,status,headers,config) {
				
				$window.sessionStorage["token"] = data.token.replace(/\"/g,'');
				//alert('添加成功');
				$scope.registerState.regFail=false;
				$scope.registerState.userExist=false;
				$scope.registerState.regSuccess=true;
				timer=$timeout(function(){
						$state.go('login');
					},3000);
				
				
			}).error(function(data,status,headers,config) {
				// 当响应以错误状态返回时调用
				if(status==409){//alert('用户已存在');
					$scope.registerState.regSuccess=false;
					$scope.registerState.regFail=false;
					$scope.registerState.userExist=true;
			    }else{
				    $scope.registerState.regSuccess=false;
					$scope.registerState.userExist=false;
					$scope.registerState.regFail=true;
					console.log("error");
					$scope.error = true;
					}
			});		
		};	
	
	$scope.$on("$destroy",function( event ) {
                $timeout.cancel( timer );
	});
                   

 }]);

angular.module('com.pupil.app').directive('pRegisterform', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/registerform.html',
    controller: 'RegisterController'
  };
});