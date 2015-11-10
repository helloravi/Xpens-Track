angular.module('Xpens-Track')
  .service('ParseService', function($q){
    ParseService=this;
    // This method is to update the share amount after the split
    ParseService.updateShare = function(user, share) {
      var query = new Parse.Query(Parse.UserDetails);
      query.equalTo("username", user.get("username"));
      query.find().then(function(result){
        net_amt=result[0].get("net_share");
        net_amt+=share;
        result[0].set("net_share",net_amt);
        result[0].save();
      }, function(){
        differedQuery.resolve(error);
      });
    };
    // This method is for user login
    ParseService.login = function(username, password) {
      deffered=$q.defer();
      Parse.User.logIn(username, password, {
        success: function(user) {
          deffered.resolve(user);
          console.log("Logged in as " + user.get("username"));
        }, error: function(user, error) {
          deffered.reject("Error loggin in user");
          console.log("Error logging in: " + error.message);
        }
      });
      return deffered.promise;
    };
    // This method is for user sign up
    ParseService.signup = function(username, password) {
      deffered=$q.defer();
      Parse.User.signUp(username, password, {
        success: function(user) {
          deffered.resolve(user);
          console.log("Signed up as " + user.get("username"));
        }, error: function(user, error) {
          deffered.reject("Error signing up the user");
          console.log("Error logging in: " + error.message);
        }
      });
      return deffered.promise;
    };

    ParseService.logOut=function(){
      Parse.User.logOut();
    }

    ParseService.currentUser=function(){
      return Parse.User.current();
    }

    // This method is for finding user
    ParseService.signup = function(username, password) {
      deffered=$q.defer();
      console.log("Before singp");
      Parse.User.signUp(username, password, null,{
        success: function(user) {
          deffered.resolve(user);
          console.log("Signed up as " + user.get("username"));
        }, error: function(user, error) {
          deffered.reject("Error signing up the user");
          console.log("Error logging in: " + error.message);
        }
      });
      return deffered.promise;
    };

});
