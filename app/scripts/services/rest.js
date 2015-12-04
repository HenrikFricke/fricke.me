angular.module('AtmApp')
  .factory('atms', ['restmod', function(restmod) {
      return restmod.model('/api/atms');
  }]);
