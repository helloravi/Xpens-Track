angular.module('Xpens-Track')
  .service('UserService', function(){
    //this service helps communicate data for user objects between controllers
    var userService = this;
    // share the user friend list through the different controllers
    userService.user = {};
    userService.user.friendsList = [];

    userService.addFriend = function(user){
      if (userService.user.friendsList.indexOf(user) === -1) {
        userService.user.friendsList.push(user);
      }
      console.log("In User Service : "+userService.user.friendsList);
    };
    userService.getFriends=function(){
      return userService.user.friendsList;
    }
});
