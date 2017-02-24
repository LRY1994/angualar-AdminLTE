;
(function(window, document, undefined) {
angular.module('app')
	.directive('pHeader', function() {
		return {
		restrict: 'E',
		templateUrl: 'particles/p-header.html',
		controllerAs:''
		};
	})
	.directive('pSidebar', function() {
		return {
		restrict: 'E',
		templateUrl: 'particles/p-sidebar.html',
		controllerAs:''
		};
	})
	.directive('pFooter', function() {
		return {
		restrict: 'E',
		templateUrl: 'particles/p-footer.html',
		controllerAs:''
		};
	})
	.directive('pBreadcrumb', function() {
		return {
		restrict: 'E',
		templateUrl: 'particles/p-breadcrumb.html',
		controllerAs:''
		};
	})
	.directive('pLoginform', function() {
		return {
		restrict: 'E',
		templateUrl: 'particles/p-loginform.html',
		controllerAs:''
		};
	})
	.directive('pRegisterform', function() {
		return {
		restrict: 'E',
		templateUrl: 'particles/p-registerform.html',
		controllerAs:''
		};
	});
	
})(window, document);