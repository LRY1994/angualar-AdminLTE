
'use strict';

// 这里只创建模块，不要写逻辑，所依赖的模块可以根据需要裁减
angular.module('com.pupil.app', [
//'ngAnimate',  // 动画效果
//'ngCookies',  // 在程序中访问Cookie
//'ngSanitize', // 对html内容进行净化，以防范xss等前端攻击
//'ngResource', // 访问REST对象
  'ui.router', // 第三方的路由访问器
  'templates'
//'ui.bootstrap'// 第三方界面库
]);
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

angular.module('templates', []);