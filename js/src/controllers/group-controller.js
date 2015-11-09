angular.module('Xpens-Track')
.controller('GroupController', function(){
  var groupCntrl = this;

  groupCntrl.userGroup = [];

  groupCntrl.addUser = function(user){
    groupCntrl.userGroup.push(user);
  };
  
});