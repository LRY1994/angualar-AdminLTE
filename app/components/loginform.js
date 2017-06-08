/*
 * loginform.js
 */
'use strict';

  
angular.module('com.pupil.app')
.controller('LoginController', [ '$scope', '$state', '$window', 'AuthService', 'Session',
function($scope, $state, $window, AuthService ,Session) {
	$scope.credentials = {};
	$scope.loginForm = {};
	$scope.error = false;
	
	$scope.submit = function() {
		$scope.submitted = true;
		if (!$scope.loginForm.$invalid) {
			$scope.login($scope.credentials);
		} else {
			$scope.submitted = false;
			return;
		}
	};
	
	$scope.login = function(credentials) {
		$scope.error = false;
		AuthService.login(credentials, function(user) {					
			$state.go('home');
		}, function(err) {
			console.log("login error");
			$scope.error = true;
		});
	};
	
	// if a session exists for current user (page was refreshed)
	// log him in again
//	if ($window.sessionStorage["userInfo"]) {
//		var credentials;
//		credentials= JSON.parse($window.sessionStorage["userInfo"]).accountNumber;
//		//credentials.password=Session.psw;
//		$scope.login(credentials);
//	}

} ]);

angular.module('com.pupil.app').directive('pLoginform', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/loginform.html',
    controller: 'LoginController'
  };
});
