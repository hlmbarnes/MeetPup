var MeetPupApp = angular.module('MeetPupApp', ['homeCtrls', 'ui.router', 'ui.bootstrap'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  // $stateProvider
  // .state('home', {
  //   url: '/',
  //   templateUrl: 'views/home.html',
  //   controller: 'HomeCtrl'
  // })
  // .state('about', {
  //   url: '/about',
  //   templateUrl: 'views/about.html',
  // })
  // .state('showEvent', {
  //   url: '/events/:id',
  //   templateUrl: 'views/events.html',
  //   controller: 'EventShowCtrl'
  // })

}]);