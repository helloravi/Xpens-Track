angular.module('Xpens-Track')
  .service('UserService', function($state){
    var userService = this;
    // share the user friend list through the different controllers
    userService.friendsList = [];
});