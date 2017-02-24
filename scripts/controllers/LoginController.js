angular.module('myApp', [])
.controller('LoginController', function($scope) {
	$scope.user= {
		name:'',
		password:''
	};
	$scope.login = function(user){
		
	}
// 如果为true，显示为登录表单
// 如果为false，显示为注册表单
$scope.showLoginForm = true;
$scope.sendLogin = function() {}
$scope.sendRegister = function() {}
});