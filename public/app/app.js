var app = angular.module('MeetPupApp', ['ui.router', 'PupsCtrls']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/404');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/pups.html',
    controller: 'HomeCtrl'
  })
  .state('newPup', {
    url: '/pups/new',
    templateUrl: 'app/views/newPup.html',
    controller: 'NewCtrl'
  })
  // before state was pupMatch
  .state('match', {
    url: '/pups/:id/match',
    templateUrl: 'app/views/matches.html',
    controller: 'MatchCtrl'
  })
  .state('pups', {
    url: '/pups', 
    templateUrl: 'app/views/pups.html',
    controller: 'ShowCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/userSignup.html',
    controller: 'SignupCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
   .state('mypup', {
    url: '/myPup',
    teplateUrl: 'app/views/myPup.html',
    controller: 'MyPupCtrl'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'app/views/404.html'
  });


  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);

