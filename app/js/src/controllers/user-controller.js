angular.module('Xpens-Track')
.controller('UserController', [ '$state','AuthenticationService', function($state,AuthenticationService){
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

  }
}]);
