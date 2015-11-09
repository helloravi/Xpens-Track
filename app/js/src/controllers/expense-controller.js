angular.module('Xpens-Track')
.controller('ExpenseController', [ '$state', '$q', "ParseService", 'UserService',  function($state, $q, ParseService, UserService){
  var expenseCntrl = this;

  expenseCntrl.users = [];
  expenseCntrl.title = "";
  expenseCntrl.amount = 0;

  expenseCntrl.friendList = function(){
    return UserService.friendList;
  }

  expenseCntrl.addUser = function(user){
    expenseCntrl.users.push(user);
  };

  function calculateShare(){
    var share = expenseCntrl.amount/expenseCntrl.users.length;
    return share;
  };

  expenseCntrl.saveExpense = function(){
    var share = calculateShare();
    expenseCntrl.users.forEach(function(user){
      user.share = share;
    });

    var Expense = Parse.Object.extend("Expense");
    var expense = new Expense();

    expense.set("title", expenseCntrl.title);
    expense.set("amount", expenseCntrl.amount);
    expense.set("users", expenseCntrl.users);

    expense.save(null, {
      success: function(expense) {
        // Execute any logic that should take place after the object is saved.
        console.log("Success in writing Expense object to the database");
      },
      error: function(expense, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  };

}]);