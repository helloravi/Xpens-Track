angular.module('Xpens-Track')
  .service('UserService', function($state){
    //this service helps communicate data for user objects between controllers
    var userService = this;
    // share the user friend list through the different controllers
    userService.user = {};
    userService.user.friendsList = [];

    userService.addFriend = function(user){
      userService.user.friendsList.push(user);
    };
});