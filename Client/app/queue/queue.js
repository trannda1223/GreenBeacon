//Queue controller

angular.module('app.queue', [])


.controller('QueueController', ['$scope', 'Tickets', 'Auth', '$location', function($scope, Tickets, Auth, $location){
  $scope.isadmin = false;
  $scope.view;
  $scope.data = {};
  var SVGpulse;
  var SVGdot;

  Socket.on('ticketChange', function() {
    if ($scope.view === 'lobby') {
      $scope.initializeQueue();   
    } else if($scope.view === 'user') {
      $scope.showUserTickets();
    }
    
  });

  $scope.initializeQueue = function() {
    $scope.view = 'lobby';
    //retrieve tickets from database
    Tickets.getTickets()
      .then(function(results){
        console.log(results, 'Tickets.getTickets inside initializeQueue called')
        $scope.isadmin = results.data.isadmin;
        $scope.userID = results.data.userID;
        $scope.name = results.data.displayname.split(" ")[0];

        
        SVGpulse = document.getElementsByClassName('pulse');
        SVGdot = document.getElementsByClassName('dot');

        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
          //if the userId of the ticket matches the current session user
          if (ticket.userId === results.data.userID) {

            //add and set isMine attribute to true
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }

        //set claims to the scope
        $scope.data.claims = results.data.claims;

        //iterate through all claims
        for (var claim of $scope.data.claims) {
          //if the helpee (user) id of the claim matches the current session user
          if (claim.helpeeId === results.data.userID) {
            //alert the helpee and include the name of the user who claimed the ticket
            alert(claim.user.displayname + ' is on their way!');

            for (var ticket of $scope.data.tickets) {
              //if the ticket's claimed attribute is true and the user of the claimed ticket matches the current session user
                //set the ticket's preSolved state to true
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            //Delete the claim from the database
            Tickets.eraseClaim(claim)
            .then(function () {
              //wipe out client-side claims object
               $scope.data.claims = {};
            })
          }
        }
      })
      .catch(function(error){
        console.error(error);
      })
  }

  $scope.showUserTickets = function() {
    $scope.view = 'user';
    //retrieve tickets from database
    Tickets.getUserTickets()
      .then(function(results){
        
        SVGpulse = document.getElementsByClassName('pulse');
        SVGdot = document.getElementsByClassName('dot');

        //add tickets to the scope
        $scope.data.tickets = results.data.tickets;
        //iterate through all tickets
        for (var ticket of $scope.data.tickets) {
          //if the userId of the ticket matches the current session user
          if (ticket.userId === results.data.userID) {

            //add and set isMine attribute to true
            ticket.ismine = true;
          } else {
            ticket.ismine = false;
          }
        }

        //set claims to the scope
        $scope.data.claims = results.data.claims;

        //iterate through all claims
        for (var claim of $scope.data.claims) {
          //if the helpee (user) id of the claim matches the current session user
          if (claim.helpeeId === results.data.userID) {
            //alert the helpee and include the name of the user who claimed the ticket
            console.log(claim, 'inside for loop before alert');
            alert(claim.user.displayname + ' is on their way!');

            for (var ticket of $scope.data.tickets) {
              //if the ticket's claimed attribute is true and the user of the claimed ticket matches the current session user
                //set the ticket's preSolved state to true
                console.log(ticket, 'presolved stuff');
              if (ticket.claimed && ticket.userId === results.data.userID) {
                ticket.preSolved = true;
              }
            }
            //Delete the claim from the database
            console.log(claim, 'about to erase this claim');
            Tickets.eraseClaim(claim)
            .then(function () {
              console.log('erased claim', claim);
              //wipe out client-side claims object
               $scope.data.claims = {};
            })
          }
        }
      })
      .catch(function(error){
        console.error(error);
      })
  }

  $scope.ticket = {};

  $scope.getCoordinates = function(event) {
    console.log(event);
    var x = event.offsetX;
    var y = event.offsetY;
    var coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    $scope.ticket.x = x;
    $scope.ticket.y = y; 


    if ($scope.ticket.x <=190 && $scope.ticket.x >= 0 && $scope.ticket.y <= 123 && $scope.ticket.y >=0) {
      $scope.ticket.location = 'Lecture Hall';
    };

    if ($scope.ticket.x <=190 && $scope.ticket.x >= 0 && $scope.ticket.y <= 239 && $scope.ticket.y >=124) {
      $scope.ticket.location = 'Pairing Stations';
    };
    if ($scope.ticket.x <=190 && $scope.ticket.x >= 25 && $scope.ticket.y <= 320 && $scope.ticket.y >=240) {
      $scope.ticket.location = 'Kitchen';
    };
    if ($scope.ticket.x <=370 && $scope.ticket.x >= 250 && $scope.ticket.y <= 325 && $scope.ticket.y >=230) {
      $scope.ticket.location = 'Couch';
    };
    if ($scope.ticket.x <=370 && $scope.ticket.x >= 270 && $scope.ticket.y <= 610 && $scope.ticket.y >=370) {
      $scope.ticket.location = 'Senior Zone';
    };
    if ($scope.ticket.x <=160 && $scope.ticket.x >= 25 && $scope.ticket.y <= 550 && $scope.ticket.y >=470) {
      $scope.ticket.location = 'The Hopper';
    };
    if ($scope.ticket.x <=160 && $scope.ticket.x >= 25 && $scope.ticket.y <= 655 && $scope.ticket.y >=590) {
      $scope.ticket.location = 'The Dijkstra';
    };
    if ($scope.ticket.x <=370 && $scope.ticket.x >= 290 && $scope.ticket.y <= 760 && $scope.ticket.y >=650) {
      $scope.ticket.location = 'The Ada';
    };
    if ($scope.ticket.x <=260 && $scope.ticket.x >= 25 && $scope.ticket.y <= 760 && $scope.ticket.y >=656) {
     $scope.ticket.location = 'Entrance Hall';
    }
    if ($scope.ticket.x <=160 && $scope.ticket.x >= 25 && $scope.ticket.y <= 470 && $scope.ticket.y >=320) {
     $scope.ticket.location = '';
    };
    if ($scope.ticket.x <= 400 && $scope.ticket.x >= 190 && $scope.ticket.y <= 239 && $scope.ticket.y >=50) {
     $scope.ticket.location = '';
    };


}


  $scope.addTicket = function () {
  //assign random color for each ticket's dot
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split(''),
        color = '#';
    for(var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  $scope.ticket.color =  getRandomColor();

  //retrieve new ticket from html form, pass to add Ticket function

  Tickets.addTicket($scope.ticket)
    .then(function () {
      $scope.ticket = {};
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  $scope.signout = function () {
    Auth.signout();
  }

  $scope.admin = function() {
    $location.path('/admin');
  }

  $scope.claimTicket = function (ticket) {

    ticket.disableTicket = true;

    //once 'claim' has been clicked'
      //pass the claimed ticket to claim Ticket service
    Tickets.claimTicket(ticket)
      .then(function () {
      })
      .catch(function (err) {
        console.log(err);
      });

  }

  $scope.solveTicket = function (ticket) {

    //if 'Solved' has been clicked on the ticket, pass that ticket into solveTicket service
     Tickets.solveTicket(ticket)
       .then(function () {
       })
       .catch(function (err) {
         console.log(err);
       });
  }


  $scope.unsolveTicket = function (ticket) {

    //if 'Not Solved' is clicked, pass the ticket to unsolveTicket service
     Tickets.unsolveTicket(ticket)
      .then(function () {
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  //functionality: on hover of ticket, hide all dots that do not match ticket's x and y coordinates
  $scope.showDot = function (ticketX, ticketY) {

    //iterate through all dots
    for (var i = 0; i < SVGdot.length; i++) {
      //find each dot's x and y coordinates
      var x = SVGdot[i].parentElement.parentElement.getAttribute('x');
      var y = SVGdot[i].parentElement.parentElement.getAttribute('y');

      //given the x and y coordinates of the ticket (ticketX, ticketY, if the dot and the ticket coordinates do NOT match, add class 'hidden' to dot.
      if (x !== ticketX.toString() && y !== ticketY.toString()) {
        SVGpulse[i].setAttribute('class', 'pulse hiddenPulse');
        SVGdot[i].setAttribute('class', 'dot hiddenDot');
      }
    }
  }

  $scope.renew = function () { 
    if ($scope.view === 'lobby') {
      $scope.initializeQueue();   
    } else if($scope.view === 'user') {
      $scope.showUserTickets();
    }

  };
 
  $scope.initializeQueue();

}]);
