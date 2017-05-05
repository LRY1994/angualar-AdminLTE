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
				
			//set the browser session, to avoid relogin on refresh
			$window.sessionStorage["userInfo"] = JSON.stringify(data);	
			
			
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
		var token = JSON.parse($window.sessionStorage["userInfo"]).token;
		$http({
			method:"DELETE",
			url:HOST+"/api/"+token
		}).success(function(data,status,headers,config){
			Session.destroy();
		    $window.sessionStorage.removeItem("userInfo");
		    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	
		}).error(function(data,status,headers,config){
			console.log("log out error");
		})
	};	

	return AuthService;
} ]);