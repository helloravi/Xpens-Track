angular.module('Xpens-Track')
.controller('UserController', [ '$state', function($state){
  var userCntrl = this;

  userCntrl.login = function(){
    console.log(userCntrl.loginusername);
    console.log(userCntrl.loginpassword);

    Parse.User.logIn(userCntrl.loginusername, userCntrl.loginpassword, {
    success: function(user) {
      // Do stuff after successful login.
      console.log("Success with login: " + user.username);
      $state.go("user");
      userCntrl.userLoggedIn = true;
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      console.log("Error with login: " + error.message);
      }
    });
  };

  userCntrl.signup = function(){
    console.log(userCntrl.signupusername);
    console.log(userCntrl.signuppassword);
    var user = new Parse.User();
    user.set("username", userCntrl.signupusername);
    user.set("password", userCntrl.signuppassword);    

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        console.log("Success with signup: " + user.username);
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.log("Error: " + error.code + " " + error.message);
      }
    }); 
  };

  userCntrl.currentUser = function(){
    return Parse.User.current();
  };

  userCntrl.logout = function(){
    Parse.User.logOut(userCntrl.currentUser());
    userCntrl.userLoggedIn = false;
    $state.go("home");
  };

  userCntrl.addFriend = function(){

  }
}]);