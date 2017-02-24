/**
 * 作者：林瑞玉
	时间：2017-02-24
	描述：路由设置
 */
;
(function(window, document, undefined) {
angular.module('app',['ui.router']).config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.when("","/login");

  $stateProvider
  	.state('home', {
      url: "/home",
      templateUrl: "pages/home.html"      
    })
  	.state('login', {
      url: "/login",
      templateUrl: "pages/login.html"	   	  
    })
    .state('register', {
      url: "/register",
      templateUrl: "pages/register.html"	 
    })
    .state('home.1', {
      url: "/1",
      templateUrl: "pages/1.html"	 
    })
    .state('home.2', {
      url: "/2",
      templateUrl: "pages/2.html"	 
    })
    
}]);
	
})(window, document);