'use strict';

angular.module('com.pupil.app')
.controller('RegisterController', [ '$scope', '$state','$http','HOST', function($scope, $state,$http,HOST) {
	$scope.credentials = {};
	$scope.registerForm = {};
	$scope.error = false;
	
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
			url: HOST+'/User/join',
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
				if(data.status==0){
					alert('添加成功');
					$state.go('login');
				}else if(data.status==1){
					alert('用户已存在');
				}else{
					alert('添加失败');
				}
				// 当相应准备就绪时调用
				
			}).error(function(data,status,headers,config) {
				// 当响应以错误状态返回时调用
				
				console.log("error");
				$scope.error = true;
			});		
	};
	

} ]);

angular.module('com.pupil.app').directive('pRegisterform', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/registerform.html',
    controller: 'RegisterController'
  };
});