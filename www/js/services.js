angular.module('Mindfilled.services', [])
.service('UserService', function($localStorage) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    $localStorage.starter_facebook_user = JSON.stringify(user_data);
  };


  var getUser = function(){
    if ($localStorage.starter_facebook_user = undefined){
      return JSON.parse($localStorage.starter_facebook_user || '{}');
    } else{
      return undefined
    }
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});