'use strict';
/**
 * This interceptor will make sure that, after each $http request
 * if the user doesn't have access to something runs the according
 * event, given the response status codes from the server. 
 */
angular.module('com.pupil.app')
.factory('AuthInterceptor', [ '$rootScope', '$q', 'Session', 'AUTH_EVENTS',
function($rootScope, $q, Session, AUTH_EVENTS) {
	return {
		responseError : function(response) {
			$rootScope.$broadcast({
				401 : AUTH_EVENTS.notAuthenticated,//未登录
//				403 : AUTH_EVENTS.notAuthorized,// 已登录，但无权限访问
				419 : AUTH_EVENTS.sessionTimeout,// Authentication Timeout (non standard) — 会话过期
				440 : AUTH_EVENTS.sessionTimeout//Login Timeout (Microsoft only) — 会话过期
			}[response.status], response);
			return $q.reject(response);
		}
	};
} ]);

