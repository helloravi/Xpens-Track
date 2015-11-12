angular.module('Xpens-Track')
  .service('UserService', function($q){
    //this service helps communicate data for user objects between controllers
    var userService = this;
    // share the user friend list through the different controllers
    function init(){
        userService.user = {};
        userService.net_amt_due=0;
        userService.friendsList = [];
        userService.friendsListObjects = [];
    }
    userService.getNetAmt=function(){
      return userService.net_amt_due;
    }
    userService.loadFriends=function(user){
      deffered=$q.defer();
      ParseService.getUserDetails(user)
      .then(function(userDetails){
        // For each of the object in friendsList get the user objects
        listOfPromises=[];
        friendsListObjs=[];
        net_amt_due=userDetails.get("net_amount");
        friendsList=userDetails.get("friends");
        friendsList.forEach(function(userId){
          var promise=ParseService.getUser(userId)
            .then(function(result){
                    user=result[0];
                    friendsListObjs.push(user);
                    console.log("Got one more user from backend..friendList:"+friendsListObjs);
                });
          listOfPromises.push(promise);
        });
        $q.all(listOfPromises).then(function(){
            console.log("All users fetched from backend");
            userDetails.net_amt_due=roundToTwo(net_amt_due);
            userDetails.friendList=friendsListObjs;
            deffered.resolve(userDetails);
        },function(error){
        console.log("Error loading friends");
        deffered.reject(error);
      });
    });
    return deffered.promise;
    }

    userService.addFriend = function(user){
      if (userService.friendsList.indexOf(user) === -1) {
          userService.friendsList.push(user);
          userService.friendsListObjects.push(user.id);
      }
      ParseService.addFriend(userService.getLoggedInUser(), userService.friendsListObjects);
      //console.log("In User Service : "+userService.friendsList);
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

    function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

    userService.getLoggedInUser=function(){
      return ParseService.currentUser();
    }
    init();
});
