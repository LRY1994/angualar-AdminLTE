/*
 * 总的页面控制器
 */

angular.module('com.pupil.app').
controller('HomeIndexController', ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS',
function($scope, $rootScope, AuthService, AUTH_EVENTS){
	var setCurrentUser = function(){
		$scope.currentUser = $rootScope.currentUser;
	}
	
	
	var goToLogin = function(){
   		$state.go("login");
   }

	$scope.currentUser = null;	

	$rootScope.$on(AUTH_EVENTS.notAuthenticated, goToLogin);//未登录
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, goToLogin);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, goToLogin);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);

} ]);