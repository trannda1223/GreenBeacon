//initialize app module, include services and auth dependencies

angular.module('app', ['app.auth', 'app.queue', 'app.services', 'app.admin', 'ngRoute', 'ngSanitize'])

.config(function($routeProvider){

	$routeProvider
		.when('/signin', {
			templateUrl: 'app/auth/signin.html',
			controller: 'AuthController'
		})
		.when('/tickets', {
			templateUrl: 'app/queue/queue.html',
			 controller: 'QueueController'
		})
		.when('/admin', {
			templateUrl: 'app/admin/admin.html',
			 controller: 'AdminController'
		})
		.when('/notauthorized', {
			templateUrl: 'app/admin/notauthorized.html'
		})
		.otherwise({
			redirectTo: '/tickets'
		});

});
