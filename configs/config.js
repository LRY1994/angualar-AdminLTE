angular.module('com.pupil.app')
/*Constants regarding user login defined here*/
.constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated'
//	notAuthorized : 'auth-not-authorized'
})
.config(['$httpProvider', function($httpProvider){
	console.log($httpProvider);
	console.log($httpProvider.interceptors);
	$httpProvider.interceptors.push('AuthInterceptor');
	console.log($httpProvider.interceptors);
}]);
/* Adding the auth interceptor here, to check every $http request*/
//.config(['$httpProvider',function ($httpProvider) {
//	console.log($httpProvider.interceptors);
// $httpProvider.interceptors.push(['$injector',function ($injector) {
//  return $injector.get('AuthInterceptor');
//}
//]);
//}])