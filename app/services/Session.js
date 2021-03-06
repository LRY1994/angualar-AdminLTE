/*
 * Session.js
 */
'use strict';

angular.module('com.pupil.app').service('Session', function($rootScope) {

	this.create = function(user,psw) {
		this.user = user;	
		this.psw = psw;
	};
	this.destroy = function() {
		this.user = null;	
		this.psw = null;
	};
	return this;
});
/*
 * In this service the user data is defined for the current session. Within
 * angular current session is until the page is refreshed. When the page is
 * refreshed the user is reinitialized through $window.sessionStorage at the
 * login.js file.
 */