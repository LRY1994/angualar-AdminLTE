'use strict';

angular.module('com.pupil.app').controller('BreadcrumbController', function () {
 
});
angular.module('com.pupil.app').directive('pBreadCrumb', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/layout/layout.breadcrumb.html',
    controller: 'BreadcrumbController'
  };
});
