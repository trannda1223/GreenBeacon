angular.module('app.admin', [])

.controller('AdminController', ['Users', '$scope', 'Tickets', '$location', function(Users, $scope, Tickets, $location){

  $scope.loadData = function(){
    Users.getUsers()
    .then(function(result){
      $scope.users = result;
    });
  };

  $scope.updateTable = function(){
    //pull user data from users array (returned from DB) by filtering
      //set selectedPerson model equal to the user that matches displayname in the menu
    $scope.selectedPerson = $scope.users
    .filter(function(user){
      return user.displayname === $scope.person;
     })[0];
  };

  $scope.updateUser = function(){
    $scope.selectedPerson.authorizationlevel = Number($scope.selectedPerson.authorizationlevel);
    Users.updateUser($scope.selectedPerson);
  };

  $scope.updateThresholds = function(){
    $scope.ticket.authlevel = Number($scope.ticket.authlevel);
    console.log($scope.ticket);
    Tickets.updateThresholds($scope.ticket);
  };

  $scope.redirect = function() {
    $location.path('/#/tickets');
  }

}]);
