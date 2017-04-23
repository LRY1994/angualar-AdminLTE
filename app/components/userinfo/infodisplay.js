'use strict';

angular.module('com.pupil.app').controller('InfodisplayController', function () {
    
});
angular.module('com.pupil.app').directive('pInfodisplay', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/infodisplay.html',
    controller: 'InfodisplayController'
  };
});
