angular
  .module('runApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  
  $locationProvider.html5Mode(true);

  // -------- USERS -------- //
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/index.html'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: 'js/views/users/index.html',
      controller: 'UsersIndexCtrl as usersIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: 'js/views/users/edit.html',
      controller: 'UsersEditCtrl as usersEdit'
    })

    // -------- TRACKS -------- //
    .state('tracksIndex', {
      url: '/tracks',
      templateUrl: 'js/views/tracks/index.html',
      controller: 'TracksIndexCtrl as tracksIndex'
    })
    .state('tracksNew', {
      url: '/tracks/new',
      templateUrl: 'js/views/tracks/new.html',
      controller: 'TracksNewCtrl as tracksNew'
    })
    .state('tracksShow', {
      url: '/tracks/:id',
      templateUrl: 'js/views/tracks/show.html',
      controller: 'TracksShowCtrl as tracksShow'
    })
    .state('tracksEdit', {
      url: '/tracks/:id/edit',
      templateUrl: 'js/views/tracks/edit.html',
      controller: 'TracksEditCtrl as tracksEdit'
    })

    // -------- SPRINTS -------- //
    .state('sprintsIndex', {
      url: '/sprints',
      templateUrl: 'js/views/sprints/index.html',
      controller: 'SprintsIndexCtrl as sprintsIndex'
    })
    .state('sprintsNew', {
      url: '/sprints/new',
      templateUrl: 'js/views/sprints/new.html',
      controller: 'SprintsNewCtrl as sprintsNew'
    })
    .state('sprintsShow', {
      url: '/sprints/:id',
      templateUrl: 'js/views/sprints/show.html',
      controller: 'SprintsShowCtrl as sprintsShow'
    })
    .state('sprintsEdit', {
      url: '/sprints/:id/edit',
      templateUrl: 'js/views/sprints/edit.html',
      controller: 'SprintsEditCtrl as sprintsEdit'
    })

    // -------- AUTH -------- //
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });

  $urlRouterProvider.otherwise('/');
}
