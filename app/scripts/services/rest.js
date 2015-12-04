angular.module('AtmApp')
  .factory('atms', function(restmod) {
      return restmod.model('/api/atms')
  })
