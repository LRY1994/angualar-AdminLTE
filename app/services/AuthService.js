'use strict';

angular.module('com.pupil.app')
.factory('AuthService', [ '$http', '$rootScope', '$window', 'Session', 'AUTH_EVENTS', 
function($http, $rootScope, $window, Session, AUTH_EVENTS) {
	var AuthService = {};
	
	
	//the login function
	AuthService.login = function(user, success, error) {
//		$http({
//			method:'GET',
//			url : '',
//			params:{
//				userName:user.username
//			} 
//		}).success(function(data,status,headers,config){
//			if(user.username == data.username && user.password == data.password){
//				$window.sessionStorage["userInfo"] = JSON.stringify(data);
//				delete loginData.password;
//				Session.create(data);
//				$rootScope.currentUser = data;
//				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);				
//				success(data);
//			}
//		}).error(function(data,status,headers,config){
//			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
//			error();
//		});
		
		$http.get('misc/users.json').success(function(data) {
		
		//this is my dummy technique, normally here the 
		//user is returned with his data from the db
		var users = data.users;
		if(users[user.username]){
			var loginData = users[user.username];
			//insert your custom login function here 
			debugger
			if(user.username == loginData.username && user.password == loginData.username){
				//set the browser session, to avoid relogin on refresh
				$window.sessionStorage["userInfo"] = JSON.stringify(loginData);
				
				//delete password not to be seen clientside 
				delete loginData.password;
				
				//update current user into the Session service or $rootScope.currentUser
				//whatever you prefer
				Session.create(loginData);
				//or
				$rootScope.currentUser = loginData;
				
				//fire event of successful login
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				//run success function
				success(loginData);
			} else{
				//OR ELSE
				//unsuccessful login, fire login failed event for 
				//the according functions to run
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				error();
			}
		}	
		});
		
	};

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