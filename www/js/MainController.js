angular.module('Mindfilled').controller('MainController', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading, $localStorage, $http){

  $scope.initMain = function(){

    if(!$localStorage.alreadyrun){
      $localStorage.spheres = ['Work','Social','Self','Rest']
      $localStorage.alreadyrun = true
    }

    //I don't fully understand why I don't seem to need this, it's as if scope automatically updates to localStorage though that is never explicitly stated

    // $scope.spheres = $localStorage.spheres
    // $scope.workingSphere = $localStorage.workingSphere
    $scope.clickable = true;
  }

  $scope.activity = function(type){
    console.log('Toggled activity: ', type)
    //prevent clicking on any other buttons
    if ($scope.clickable == false){
      console.log('not clickable')
    } else {
      $scope.clickable = false

      //Creates and/or updates existing activity log

      var now = new Date();
      console.log('time is now: ', now)

      //send over the user ID,type,currentTime,

      $http({
        method: "POST",
        url: "https://mindfull-db.herokuapp.com/",
        data: {
          userID: $scope.user.userID,
          workingType: $localStorage.workingSphere,
          type: type,
          time: now
        }
      })
      .success(function(result) {

        //if no working sphere exists, new thing clicked is now workingSphere and update array values to working
        if ($localStorage.workingSphere == undefined){
          console.log('working was undefined')
          $localStorage.workingSphere = type
          for (i=0; i < $localStorage.spheres.length; i++){
            if ($localStorage.spheres[i] == type){
              $localStorage.spheres[i] = 'Currently: '+ type
            }
          }
        }
        //if working sphere exists and is clicked, no working sphere exists and update array values to not working
        else if ($localStorage.workingSphere == type){
           console.log('working was equal to type')
          $localStorage.workingSphere = undefined
          $localStorage.spheres = ['Work','Social','Self','Rest']
          $scope.spheres = $localStorage.spheres
        }
        //if working sphere exists but is not the thing clicked, new working sphere exist and update arry values for old to not working and enw to working
        else {
          console.log('else condition')
          $localStorage.workingSphere = type
          $localStorage.spheres = ['Work','Social','Self','Rest']
          for (i=0; i < $localStorage.spheres.length; i++){
            if ($localStorage.spheres[i] == type){
              $localStorage.spheres[i] = 'Currently: '+ type
            }
          }
          $scope.spheres = $localStorage.spheres
        }
        console.log('request result was: ', result)
        $scope.clickable = true
      })
      .error(function(error){
        console.log(JSON.stringify(error));
        $scope.clickable = true
      });
    }
  }

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        // $ionicLoading.show({
        //   template: 'Logging out...'
        // });

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          // $ionicLoading.hide();
          $localStorage.starter_facebook_user = undefined
          $localStorage.alreadyrun = false
          $localStorage = {}
          $state.go('auth');
        },
        function(fail){
          // $ionicLoading.hide();
        });
      }
    });
  };




})