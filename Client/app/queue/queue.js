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
        $scope.authorizationlevel = results.data.authorizationlevel;
        $scope.setUserRole = function() {
          if ($scope.authorizationlevel === 1) {
            $scope.role = 'student';
          } else if ($scope.authorizationlevel === 2) {
            $scope.role = 'fellow';
          } else {
            $scope.role = 'instructor';
          }
        };
        $scope.setUserRole();

        
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

    if ($scope.ticket.x <= 258 && $scope.ticket.x >= 102 && $scope.ticket.y <= 85 && $scope.ticket.y >= 16) {
      $scope.ticket.location = 'Lecture Hall';
    };

    if ($scope.ticket.x <= 258 && $scope.ticket.x >= 102 && $scope.ticket.y <= 159 && $scope.ticket.y >= 86) {
      $scope.ticket.location = 'Pairing Stations';
    };

    if ($scope.ticket.x <= 258 && $scope.ticket.x >= 102 && $scope.ticket.y <= 255 && $scope.ticket.y >= 160) {
      $scope.ticket.location = 'Kitchen';
    };

    if ($scope.ticket.x <=393 && $scope.ticket.x >= 259 && $scope.ticket.y <= 255 && $scope.ticket.y >= 160) {
      $scope.ticket.location = 'Couch';
    };
    if ($scope.ticket.x <=393 && $scope.ticket.x >= 232 && $scope.ticket.y <= 484 && $scope.ticket.y >=257) {
      $scope.ticket.location = 'Senior Zone';
    };
    if ($scope.ticket.x <=231 && $scope.ticket.x >= 102 && $scope.ticket.y <= 433 && $scope.ticket.y >=340) {
      $scope.ticket.location = 'The Hopper';
    };
    if ($scope.ticket.x <=231 && $scope.ticket.x >= 102 && $scope.ticket.y <= 507 && $scope.ticket.y >=434) {
      $scope.ticket.location = 'The Dijkstra';
    };
    if ($scope.ticket.x <=393 && $scope.ticket.x >= 311 && $scope.ticket.y <= 595 && $scope.ticket.y >=485) {
      $scope.ticket.location = 'The Ada';
    };
    if ($scope.ticket.x <=310 && $scope.ticket.x >= 101 && $scope.ticket.y <= 595 && $scope.ticket.y >=508) {
     $scope.ticket.location = 'Entrance Hall';
    }
    //  water closet
    if ($scope.ticket.x <=231 && $scope.ticket.x >= 102 && $scope.ticket.y <= 339 && $scope.ticket.y >=256) {
     $scope.ticket.location = '';
    };
    // instructors office
    if ($scope.ticket.x <= 400 && $scope.ticket.x >= 259 && $scope.ticket.y <= 159 && $scope.ticket.y >=16) {
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
