'use strict';

angular.module('com.pupil.app')
.factory('AuthService', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS','HOST', 
function($http, $rootScope, $window, Session, AUTH_EVENTS,HOST) {
	var AuthService = {};
	
	
	//the login function
	AuthService.login = function(user, success, error) {
		$http({
			method:'POST',
			url : HOST+'/api/token',
			data:{
				'accountNumber':user.username,
				'password':user.password
			}
		}).success(function(data,status,headers,config){
			console.log(data);		
			$window.sessionStorage["token"] = data.token;				
			Session.create(data);
			$rootScope.currentUser = data;
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);				
			success(data);
			
		}).error(function(data,status,headers,config){
			
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			error();
		});
	}
		

	//check if the user is authenticated
	AuthService.isAuthenticated = function() {
		return !!Session.user;
	};
	
	//log out the user and broadcast the logoutSuccess event
	AuthService.logout = function(){
		
		$http({
			method:"DELETE"
		}).success(function(data,status,headers,config){
			Session.destroy();
		    $window.sessionStorage.removeItem("token");
		    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	
		}).error(function(data,status,headers,config){
			
		})
	};	

	return AuthService;
} ]);