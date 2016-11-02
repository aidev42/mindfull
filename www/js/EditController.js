angular.module('Mindfilled').controller('EditController', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading, $localStorage, $http, moment){

  $scope.getData = function(){
    $scope.clickable = false
    $http({
      method: "POST",
      url: "https://mindfull-db.herokuapp.com/history",
      data: {
        userID: $scope.user.userID
      }
    })
    .success(function(result) {
      $scope.Activities = result
      for (i=0; i < result.length; i++){
        console.log('unparsed time: ', $scope.Activities[i].started)
        console.log('parsed time: ',moment($scope.Activities[i].started).calendar())
      }

      console.log('successful API call')
      console.log($scope.Activities)
      $scope.clickable = true
    })
    .error(function(error){
      console.log(JSON.stringify(error));
      $scope.clickable = true
    });
  }

  $scope.$on('$stateChangeSuccess',function(){
    console.log('state change was hit')

    if ($state.current.name == "app.edit"){
      $scope.clickable = true
      $scope.getData()
    }
  })

  //Per documentation angular $http does not allow a DELETE request to send a body, so while a DELETE request is semantically correct and works via postman, must use PUT here as 2nd best option
  $scope.delete = function(activity){
    if ($scope.clickable = false){
      console.log('not clickable')
    } else {
      console.log('trying to delete activity with this id: ', activity._id)
      $http({
        method: "PUT",
        url: "https://mindfull-db.herokuapp.com/history",
        data: {
          _id: activity._id
        }
      })
      .success(function(result) {
        console.log('succesful delete: ', result)
        $scope.getData()
      })
      .error(function(error){
        console.log(JSON.stringify(error));
      });
    }
  }

});