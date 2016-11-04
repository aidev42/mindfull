angular.module('Mindfilled').controller('EditController', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading, $localStorage, $http, moment){

  $scope.$on('$stateChangeSuccess',function(){
    if ($state.current.name == "app.edit"){
      $scope.activity = $localStorage.editActivity
      $scope.data = {}
      $scope.data.startTimeInput = $scope.activity.started
      $scope.data.endTimeInput = $scope.activity.ended
      console.log('scope id is: ', $scope.activity._id)
    }
  })

  $scope.save = function(){

    //convert each time to unix, then send over the new start and end times and acitivity id

    var newStartTime = moment($scope.data.startTimeInput).unix()*1000
    var newEndTime = moment($scope.data.endTimeInput).unix()*1000

    $http({
      method: "PUT",
      url: "https://mindfull-db.herokuapp.com/edit",
      data: {
        _id: $scope.activity._id,
        started: newStartTime,
        ended: newEndTime
      }
    })
    .success(function(result) {
      //upon success fire popup and then go back to history state
      console.log(result)
    })
    .error(function(error){
      console.log(JSON.stringify(error));
    });
  }

});