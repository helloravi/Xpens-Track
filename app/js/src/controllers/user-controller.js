angular.module('Xpens-Track')
.controller('UserController', [ '$state', 'AuthenticationService', 'UserService', function($state, AuthenticationService, UserService){

  var userCntrl = this;

  function init(){
    redirectIfLoggedIn();
  };

  userCntrl.friendList = function(){
    console.log(UserService.getFriends());
    return UserService.getFriends();
  }

  function redirectIfLoggedIn() {
     if (AuthenticationService.loggedIn()) {
       $state.go('user');
    }
  }

  userCntrl.login = function(){
    userCntrl.loginProcessing=true;
    var promise=AuthenticationService.login(userCntrl.loginusername,userCntrl.loginpassword);
    promise.then(function(user){
      userCntrl.loginProcessing=false;
      userCntrl.loginusername="";
      userCntrl.loginpassword="";
      UserService.user = user;
      console.log("Loggin userservice");
      console.log(UserService.user);
      $state.go('user');
      UserService.loadFriends(user);
    }).catch(function(error){
      console.log("Error logging in");
      userCntrl.loginProcessing=false;
    });
  };

  userCntrl.signup = function(){
    userCntrl.signupProcessing=true;
    var promise=AuthenticationService.signup(userCntrl.signupusername,userCntrl.signuppassword);
    promise.then(function(user){
      userCntrl.signupProcessing=false;
      userCntrl.signupusername="";
      userCntrl.signuppassword="";
      UserService.user = user;
      UserService.initializeUserDetails(user).
      then(function(){$state.go('user');},function(){});
    }).catch(function(error){
      console.log("Error signing in");
      userCntrl.signupProcessing=false;
    });
  };

  userCntrl.currentUser = function(){
    return UserService.user;
  };

  userCntrl.logout = function(){
    AuthenticationService.logout();
    //userService.friendsList = [];
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
  userCntrl.addFriend = function(user){
    //debugger
    UserService.addFriend(user);
    //console.log(UserService.user.friendsList);
  };


  userCntrl.searchFriend = function(){
    userCntrl.friendsFound=false;
    userCntrl.friendsNotFound=false;
    userCntrl.usersToAdd=[];
    var promise=UserService.searchUser(userCntrl.searchUser);
      promise.then(function(result){
        if (result.length !== 0) {
          userCntrl.usersToAdd.push(result);
          userCntrl.friendsFound=true;
        } else {
          console.log("nothing returned from Parse");
          userCntrl.friendsFound=false;
          userCntrl.friendsNotFound=true;
        }
        }).catch(function(err){
          userCntrl.friendsFound=false;
          userCntrl.friendsNotFound=true;
          console.log("error getting data for query: " + err);
        });
    }

  init();

}]);
