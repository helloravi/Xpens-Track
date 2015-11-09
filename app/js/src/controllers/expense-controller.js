angular.module('Xpens-Track')
.controller('ExpenseController', [ '$state', '$q',  function($state, $q){
  var expenseCntrl = this;

  expenseCntrl.users = [];
  expenseCntrl.title = "";

  expenseCntrl.addUser = function(user){
    expenseCntrl.users.push(user);
  };

  

}]);