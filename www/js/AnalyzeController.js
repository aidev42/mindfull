angular.module('Mindfilled').controller('AnalyzeController', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading, $localStorage, $http, moment){

  $scope.getData = function(){
    $http({
      method: "POST",
      url: "https://mindfull-db.herokuapp.com/history",
      data: {
        userID: $scope.user.userID,
        analyze: true
      }
    })
    .success(function(result) {
      //we will get back an array of total hours for each activity, once this occurs, create arrays for charting purposes
      console.log('this is analyze: ', result)
      $scope.chartLabels = ["Work", "Social", "Self", "Rest"]
      $scope.chartSeries = ['Targets','Realized']
      $scope.chartData = [
        [$localStorage.data.workHours,$localStorage.data.socialHours,$localStorage.data.selfHours,$localStorage.data.restHours],
        result
        ]

        // $scope.barchartLabels = angular.copy($scope.chartLabels)
        // $scope.barchartSeries = angular.copy($scope.chartSeries)
        // $scope.barchartData = angular.copy($scope.chartData)



      console.log('successful API call')
      console.log($scope.Activities)

    })
    .error(function(error){
      console.log(JSON.stringify(error));
    });
  }

});