angular.module('Xpens-Track')
.controller('UserController', [ '$state', '$q', 'AuthenticationService', 'UserService', function($state, $q, AuthenticationService, UserService){

  var userCntrl = this;
  
  userCntrl.friendList = function(){
    return UserService.friendsList;
  }

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
  userCntrl.addFriend = function(user){
    UserService.friendsList.push(user);
    console.log(userCntrl.friendsList);
  };


  userCntrl.searchFriend = function(){
    // console.log(userCntrl.searchUser);
    userCntrl.friendsFound=false;
    userCntrl.friendsNotFound=false;
    userCntrl.usersToAdd = [];
    var differedQuery = $q.defer();
    var query = new Parse.Query(Parse.User);
    query.equalTo("username", userCntrl.searchUser);
    userCntrl.searchedUserName=userCntrl.searchUser;
    query.find().then(function(data){
      differedQuery.resolve(data);
    }, function(){
      differedQuery.resolve(error);
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
}]);
