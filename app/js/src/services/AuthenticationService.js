angular.module('Xpens-Track')
  .service('AuthenticationService', function($state) {
    var AuthenticationService = this;

    AuthenticationService.login = function(username, password) {
      Parse.User.logIn(username, password, {
        success: function(user) {
          console.log("Logged in as " + user.get("username"));
          $state.go('user')
        }, error: function(user, error) {
          console.log("Error logging in: " + error.message);
        }
      });
    };

    AuthenticationService.signup = function(username, password) {
      Parse.User.signUp(username, password, null, {
        success: function(user) {
          console.log("Signedup as " + user.get("username"));
          $state.go('user')
        }, error: function(user, error) {
          console.log("Error signing up: " + error.message);
        }
      });
    };

    AuthenticationService.logout = function() {
      Parse.User.logOut();
      $state.go('home');
    };

    AuthenticationService.currentUser = function() {
      return Parse.User.current();
    };

    AuthenticationService.loggedIn = function() {
      return !!AuthenticationService.currentUser();
    };
  });
