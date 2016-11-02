// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Mindfilled', ['ionic','Mindfilled.services', 'ngStorage', 'angularMoment', 'chart.js'])

// .run(function($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout) {
.run(function($ionicPlatform, $rootScope, $ionicConfig, $timeout) {

  $ionicPlatform.on("deviceready", function(){
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // PushNotificationsService.register();
  });

  // // This fixes transitions for transparent background views
  // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
  //   if(toState.name.indexOf('auth.walkthrough') > -1)
  //   {
  //     // set transitions to android to avoid weird visual effect in the walkthrough transitions
  //     $timeout(function(){
  //       $ionicConfig.views.transition('android');
  //       $ionicConfig.views.swipeBackEnabled(false);
  //       console.log("setting transition to android and disabling swipe back");
  //     }, 0);
  //   }
  // });
  // $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
  //   if(toState.name.indexOf('app.feeds-categories') > -1)
  //   {
  //     // Restore platform default transition. We are just hardcoding android transitions to auth views.
  //     $ionicConfig.views.transition('platform');
  //     // If it's ios, then enable swipe back again
  //     if(ionic.Platform.isIOS())
  //     {
  //       $ionicConfig.views.swipeBackEnabled(true);
  //     }
  //     console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
  //   }
  // });

  // $ionicPlatform.on("resume", function(){
  //   PushNotificationsService.register();
  // });

})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider


  .state('auth', {
    url: '/auth',
    templateUrl: "views/auth.html",
    controller: 'AuthController'
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "views/side-menu.html",
    controller: 'AppController'
  })

  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "views/main.html",
        controller: 'MainController'
      }
    }
  })

  .state('app.edit', {
    url: "/edit",
    views: {
      'menuContent': {
        templateUrl: "views/edit.html",
        controller: 'EditController'
      }
    }
  })

  .state('app.targets', {
    url: "/targets",
    views: {
      'menuContent': {
        templateUrl: "views/targets.html",
        controller: 'TargetsController'
      }
    }
  })

  .state('app.analyze', {
    url: "/analyze",
    views: {
      'menuContent': {
        templateUrl: "views/analyze.html",
        controller: 'AnalyzeController'
      }
    }
  })

  $urlRouterProvider.otherwise('/auth');
  //For dev
  // $urlRouterProvider.otherwise('/app/main');
});
