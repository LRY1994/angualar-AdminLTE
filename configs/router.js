/**
 * 作者：林瑞玉
	时间：2017-02-24
	描述：路由设置
 */

angular.module('com.pupil.app')
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  // For any unmatched url, redirect to /
  $urlRouterProvider.when("","/notFound");

  $stateProvider
  	.state('home', {
      url: "/",
      templateUrl: "pages/home.html"
    })
  	.state('notFound', {
    url: '/notFound',
    templateUrl: 'pages/notFound.html'
  })
  	.state('login', {
      url: "/login",
      templateUrl: "pages/login.html",	

    })
    .state('register', {
      url: "/register",
      templateUrl: "pages/register.html"	
	 
    })
     
    .state('home.page1', {
      url: "data/page1",
      templateUrl: "pages/1.html",
    	 
    })
    .state('home.page2', {
      url: "data/page2",
      templateUrl: "pages/2.html",	
     	 
    })
    
}]);
	
