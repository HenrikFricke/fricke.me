angular.module('AtmApp').controller('AtmController', ['$scope', 'atms', function($scope, atms) {
  var list = atms.$collection()
  var list = list.$refresh()
  list.$then(function() {
    $scope.list = list
  })
}])
