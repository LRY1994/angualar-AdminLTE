'use strict';

// Configure the main application module.
var loginApp = angular.module('app', ['ui.router', 'ui.bootstrap'])
/*Constants regarding user login defined here*/
.constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
})
/* Adding the auth interceptor here, to check every $http request*/
.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})
.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
	
	//before each state change, check if the user is logged in
	//and authorized to move onto the next state
	$rootScope.$on('$stateChangeStart', function (event, next) {	   
	        // user is not logged in
	        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	      }
	    }
	});
	
	/* To show current active state on menu */
	$rootScope.getClass = function(path) {
		if ($state.current.name == path) {
			return "active";
		} else {
			return "";
		}
	}
	
	$rootScope.logout = function(){
		AuthService.logout();
	};

});