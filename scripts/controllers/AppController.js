'use strict';

angular.module('app').
controller('ApplicationController', ['$scope', '$rootScope', 'AuthService', 'AUTH_EVENTS',
function($scope, $rootScope, AuthService, AUTH_EVENTS){
	var setCurrentUser = function(){
		$scope.currentUser = $rootScope.currentUser;
	}
	
	var showNotAuthorized = function(){
		alert("Not Authorized");
	}
	
	$scope.currentUser = null;	
	$scope.isAuthorized = AuthServices.isAuthorized;

	//listen to events of unsuccessful logins, to run the login dialog
	$rootScope.$on(AUTH_EVENTS.notAuthorized, showNotAuthorized);
	$rootScope.$on(AUTH_EVENTS.notAuthenticated, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.sessionTimeout, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.logoutSuccess, showLoginDialog);
	$rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
	
	$scope.showLoginDialog = function(){
   		$state.go("login",{username:user.name});
  };
  
} ]);