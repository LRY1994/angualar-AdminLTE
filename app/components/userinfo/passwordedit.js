'use strict';

angular.module('com.pupil.app').controller('PasswordeditController', function () {
 
});
angular.module('com.pupil.app').directive('pPasswordedit', function () {
  return {
    restrict: 'EA',
    scope: {},
    templateUrl: 'components/userinfo/passwordedit.html',
    controller: 'PasswordeditController'
  };
});
