angular.module('com.pupil.app')
.run(function($rootScope, $state, AuthService, AUTH_EVENTS) {
	$rootScope.currentUser = null;	
	//before each state change, check if the user is logged in
	//and authorized to move onto the next state
	$rootScope.$on('$stateChangeStart', function (event, next) {	   
	        // user is not logged in
	     $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
	      
	      }
	    
	);
	
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
