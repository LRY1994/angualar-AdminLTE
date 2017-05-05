'use strict';

angular.module('com.pupil.app').controller('SidebarController', function () {
 
});
angular.module('com.pupil.app').directive('pSidebar', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/layout.sidebar.html',
    controller: 'SidebarController'
  };
});
