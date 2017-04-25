'use strict';

angular.module('com.pupil.app').controller('SidebarController', function () {
 
});
angular.module('com.pupil.app').directive('pSidebar', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/parts/sidebar.html',
    controller: 'SidebarController'
  };
});
