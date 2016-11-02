angular.module('Mindfilled').controller('TargetsController', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading, $localStorage, $http, moment, $ionicPopup){

$scope.$on('$stateChangeSuccess',function(){
    console.log('targets state change was hit', $state.current.name)

    if ($localStorage.targetsInit0 == undefined){
      console.log('made it into local storage check')
      $localStorage.data = {}
      $localStorage.data.workHours = 42
      console.log('local storage work hours is: ', $localStorage.data.workHours)
      $localStorage.data.socialHours = 42
      $localStorage.data.selfHours = 42
      $localStorage.data.restHours = 42
      $localStorage.data.totalHours = 168
      $localStorage.targetsInit0 = true
    }

    console.log('checking')
    if ($state.current.name == "app.targets"){
      console.log('about to run initData')
      $scope.initData()
    } else{
      //changing away from state so update scopes back to local storage
      $scope.data = angular.copy($localStorage.data)
    }
    console.log('done checking')
  })

$scope.initData = function(){
  $scope.data = angular.copy($localStorage.data)
}

$scope.setHours = function(){
  //update total
  $scope.data.totalHours = parseInt($scope.data.workHours) + parseInt($scope.data.socialHours) + parseInt($scope.data.selfHours) + parseInt($scope.data.restHours)
}

$scope.save = function(){
  //check total, if not 168 fire popup, if = 168 save to localStorage

  showSaveResult = function(title,message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });
    alertPopup.then(function(res) {
      //res is 'true', this fires after 'OK' button is clicked
    });
  }

  //Fire popup
  if ($scope.data.totalHours > 168){
    showSaveResult('Could not Save','Total hours greater than 168 hours in week')
  } else if ($scope.data.totalHours < 168){
    showSaveResult('Could not Save','Total hours less than 168 hours in week')
  }
  else{
    $localStorage.data.workHours = angular.copy($scope.data.workHours)
    $localStorage.data.socialHours = angular.copy($scope.data.socialHours)
    $localStorage.data.selfHours = angular.copy($scope.data.selfHours)
    $localStorage.data.restHours = angular.copy($scope.data.restHours)
    showSaveResult('Changes Saved','New targets successfully saved')
  }
}

});