'use strict';

angular.module('com.pupil.app')
.controller('RegisterController', [ '$scope', '$state', function($scope, $state) {
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
			url: '/api/users.json',
			//换成查询字符串追加在URL后面
			params: {
				'username': 'auser'
			},
			//会被当作消息体发送给服务器的数据。通常在发送POST请求时使用。
			data : {
				user :credentials
			}
			}).success(function(data,status,headers,config) {
				// 当相应准备就绪时调用
				$state.go('login');
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