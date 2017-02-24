'use strict';

/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 */
angular.module('loginApp').service('Session', function($rootScope) {

	this.create = function(user) {
		this.user = user;		
	};
	this.destroy = function() {
		this.user = null;		
	};
	return this;
});