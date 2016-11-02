angular.module('Mindfilled').controller('AppController', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading, $localStorage, $http){

  $scope.initApp = function(){

    console.log('MAIN SEES USER: ', JSON.parse($localStorage.starter_facebook_user))
    $scope.spheres = $localStorage.spheres
    $scope.workingSphere = $localStorage.workingSphere
    $scope.user = JSON.parse($localStorage.starter_facebook_user)
    $scope.user.firstName = $scope.user.name.substr(0,$scope.user.name.indexOf(' '));
    console.log('USER is: ', $scope.user)
  }

})