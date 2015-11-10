angular.module('Xpens-Track')
.controller('UserController', [ '$state', '$q', 'AuthenticationService', 'UserService', function($state, $q, AuthenticationService, UserService){

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
    promise.then(function(result){
      console.log(result);
      userCntrl.loginProcessing=false;
      userCntrl.loginusername="";
      userCntrl.loginpassword="";
      $state.go('user');
    }).catch(function(error){
      console.log("Error logging in");
      userCntrl.loginProcessing=false;
    });
  };

  userCntrl.signup = function(){
    userCntrl.signupProcessing=true;
    var promise=AuthenticationService.signup(userCntrl.signupusername,userCntrl.signuppassword);
    promise.then(function(result){
      console.log(result);
      userCntrl.signupProcessing=false;
      userCntrl.signupusername="";
      userCntrl.signuppassword="";
      $state.go('user');
    }).catch(function(error){
      console.log("Error signing in");
      userCntrl.signupProcessing=false;
    });
  };

  userCntrl.currentUser = function(){
    return userService.user;
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
  userCntrl.addFriend = function(user){
    UserService.addFriend(user);
    console.log(UserService.user.friendsList);
  };


  userCntrl.searchFriend = function(){
    // console.log(userCntrl.searchUser);
    userCntrl.friendsFound=false;
    userCntrl.friendsNotFound=false;
    userCntrl.usersToAdd=[];
    var differedQuery = $q.defer();
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", userCntrl.searchUser);
    userCntrl.searchedUserName=userCntrl.searchUser;
    query.find().then(function(data){
      differedQuery.resolve(data);
    }, function(){
      differedQuery.reject(error);
    });


    differedQuery.promise
    .then(function(result){
      if (result.length !== 0) {
        //debugger
        userCntrl.usersToAdd.push(result[0]);
        userCntrl.friendsFound=true;
      } else {
        console.log("nothing returned from Parse");
        userCntrl.friendsFound=false;
        userCntrl.friendsNotFound=true;
      }
    })
    .catch(function(error){
      userCntrl.friendsFound=false;
      userCntrl.friendsNotFound=true;
      console.log("error getting data for query: " + error.message);
    })
  };

  init();

}]);
