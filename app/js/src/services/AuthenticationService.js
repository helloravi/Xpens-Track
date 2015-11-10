angular.module('Xpens-Track')
  .service('AuthenticationService', function($state, $q,UserService,ParseService) {
    var AuthenticationService = this;

    AuthenticationService.login = function(username, password) {
      // As this is an async function using a promise
        var promise=ParseService.login(username, password);
        // Also create a promise as this function also needs to return one
        var deffered=$q.defer();
        promise.then(function(user){
          UserService.user = user;
          console.log("Logged in as " + user.get("username"));
          deffered.resolve("User logged in");
        }).catch(function(err){
          deffered.reject("User not logged in");
        });
      return deffered.promise;
    };

    AuthenticationService.signup = function(username, password) {
      // As this is an async function using a promise
        var promise=ParseService.signup(username, password);
        // Also create a promise as this function also needs to return one
        var deffered=$q.defer();
        promise.then(function(user){
          UserService.user = user;
          console.log("Signed up as " + user.get("username"));
          deffered.resolve("User signed up");
        }).catch(function(err){
          deffered.reject("User not signed up");
        });
      return deffered.promise;
    };


    AuthenticationService.logout = function() {
      ParseService.logOut();
    };

    AuthenticationService.currentUser = function() {
      return ParseService.currentUser();
    };

    AuthenticationService.loggedIn = function() {
      return !!AuthenticationService.currentUser();
    };
  });
