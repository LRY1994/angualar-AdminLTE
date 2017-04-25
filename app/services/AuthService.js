'use strict';

angular.module('com.pupil.app')
.factory('AuthService', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS','HOST', 
function($http, $rootScope, $window, Session, AUTH_EVENTS,HOST) {
	var AuthService = {};
	
	
	//the login function
	AuthService.login = function(user, success, error) {
		$http({
			method:'POST',
			url : HOST+'/User/login',
			data:JSON.stringify({
				'accountNumber':user.username,
				'password':user.password
			})
		}).success(function(data,status,headers,config){
			if(data.status==0){
				delete data.status;
				data.passwordEncoded=data.password;
				delete data.password;
				$window.sessionStorage["userInfo"] = JSON.stringify(data);
//				
				Session.create(data);
				$rootScope.currentUser = data;
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);				
				success(data);
			}else{
				error();
			}
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
		Session.destroy();
		$window.sessionStorage.removeItem("userInfo");
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	}

	return AuthService;
} ]);