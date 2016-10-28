angular.module('app.admin', [])

.controller('AdminController', ['Users', '$scope', '$location', function(Users, $scope, $location){

  $scope.loadData = function(){
    Users.getUsers()
    .then(function(result){
      $scope.users = result;
      console.log(result[0], 'result(0)');
    });
  };

  $scope.updateTable = function(){
    $scope.selectedPerson = $scope.users.filter(function(user){return user.displayname === $scope.person })[0];
    console.log('hope it worked', $scope.selectedPerson);
  };

  $scope.updateUser = function(){

    $scope.selectedPerson.authorizationlevel = Number($scope.selectedPerson.authorizationlevel);
    console.log($scope.selectedPerson, 'PERSON INSIDE UPDATE FUNCTION');
    Users.updateUser($scope.selectedPerson);
  };

  $scope.redirect = function() {
    $location.path('/#/tickets');
  }

}]);
