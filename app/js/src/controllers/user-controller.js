angular.module('Xpens-Track')
.controller('UserController', [ '$state', '$q', 'AuthenticationService', function($state, $q,AuthenticationService){
  var userCntrl = this;


  userCntrl.login = function(){
    console.log(userCntrl.loginusername);
    console.log(userCntrl.loginpassword);
    AuthenticationService.login(userCntrl.loginusername,userCntrl.loginpassword);
  };

  userCntrl.signup = function(){
    console.log(userCntrl.signupusername);
    console.log(userCntrl.signuppassword);
    AuthenticationService.signup(userCntrl.signupusername,userCntrl.signuppassword);
    $state.go('user')
  };

  userCntrl.currentUser = function(){
    return Parse.User.current();
  };

  userCntrl.logout = function(){
    AuthenticationService.logout();
    //userCntrl.userLoggedIn = false;
    $state.go("home");
  };

  userCntrl.loggedIn=function(){
    return AuthenticationService.loggedIn();
  };

  userCntrl.username = function() {
      var currentUser = AuthenticationService.currentUser();
      if (currentUser) {
        return currentUser.get("username");
      } else {
        return "";
      }
    }
  userCntrl.addFriend = function(){

  };


  userCntrl.searchFriend = function(){
    // console.log(userCntrl.searchUser);
    userCntrl.friendsFound=false;
    userCntrl.usersToAdd = [];
    var differedQuery = $q.defer();
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", userCntrl.searchUser);
    query.find().then(function(data){
      differedQuery.resolve(data);
    }, function(){
      differedQuery.resolve(error);
    });

    differedQuery.promise
    .then(function(result){
      console.log(result);
      userCntrl.usersToAdd.push(result);
      userCntrl.friendsFound=true;
      // userCntrl.usersToAdd[0].get("username");
    })
    .catch(function(error){
      userCntrl.friendsFound=false;
      console.log("error getting data for query: " + error.message);
    })
  };
}]);
