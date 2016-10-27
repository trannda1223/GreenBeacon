angular.module('app.admin', [])

.controller('AdminController', ['Users', '$scope', function(Users, $scope){

  $scope.loadData = function(){
    Users.getUsers()
    .then(function(result){
      $scope.users = result;
    });
  }




}]);
