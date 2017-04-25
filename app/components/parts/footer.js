'use strict';

angular.module('com.pupil.app').controller('FooterController', function () {
 
});
angular.module('com.pupil.app').directive('pFooter', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/parts/footer.html',
    controller: 'FooterController'
  };
});
