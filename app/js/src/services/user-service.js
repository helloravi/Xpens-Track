angular.module('Xpens-Track')
  .service('UserService', function($q){
    //this service helps communicate data for user objects between controllers
    var userService = this;
    // share the user friend list through the different controllers
    userService.user = {};
    userService.friendsList = [];

    userService.loadFriends=function(user){
      deffered=$q.defer();
      ParseService.getFriends(user)
      .then(function(friendsList){
        deffered.resolve(friendsList);
      },function(error){
        console.log("Error loading friends");
        deffered.reject(error);
      });
      deffered.promise.then(function(friendsList){
        debugger
        userService.friendsList=friendsList;
        console.log("Loaded Friends");
      }).catch(function(error){

      });
    }

    userService.addFriend = function(user){
      if (userService.friendsList.indexOf(user) === -1) {
          userService.friendsList.push(user);
      }
      ParseService.addFriend(userService.user,userService.friendsList);
      console.log("In User Service : "+userService.friendsList);
    };
    userService.getFriends=function(){
      return userService.friendsList;
    }

    userService.searchUser=function(userName){
      // As this is an async function using a promise
        var promise=ParseService.searchUser(userName);
        // Also create a promise as this function also needs to return one
        var deffered=$q.defer();
        promise.then(function(user){
          console.log("User found" + user.get("username"));
          deffered.resolve(user);
        }).catch(function(err){
          deffered.reject("User not found");
        });
      return deffered.promise;

    }

    userService.initializeUserDetails=function(user){
      // As this is an async function using a promise
        var promise=ParseService.createUserDetails(user);
        // Also create a promise as this function also needs to return one
        return promise;
        // promise.then(function(user){
        //   console.log("User Details initialized");
        // },function(err){
        //   console.log("User Details not initialized");
        // });
    }
});
