/**
 * 作者：林瑞玉
	时间：2017-02-24
	描述：路由设置
 */

angular.module('com.pupil.app').config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.when("","/notFound");

  $stateProvider
  	.state('home', {
      url: "/",
      templateUrl: "controllers/home/index.html"
//    controller:"HomeIndexController"
    })
  	.state('notFound', {
    url: '/notFound',
    templateUrl: 'controllers/home/notFound.html'
//  controller: 'HomeNotFoundController'
  })
  	.state('login', {
      url: "/login",
      templateUrl: "controllers/user/login.html",	
    controller: 'LoginController'
    })
    .state('register', {
      url: "/register",
      templateUrl: "controllers/user/register.html"	
//    controller: 'RegisterController'	 
    })
     
    .state('home.page1', {
      url: "data/page1",
      templateUrl: "controllers/data/1.html",
      controller: ''	 
    })
    .state('home.page2', {
      url: "data/page2",
      templateUrl: "controllers/data/2.html",	
      controller: ''	 
    })
    
}]);
	
