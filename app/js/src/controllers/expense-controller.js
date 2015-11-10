angular.module('Xpens-Track')
.controller('ExpenseController', [ '$state', '$q', "ParseService", 'UserService',  function($state, $q, ParseService, UserService){
  var expenseCntrl = this;
  function init(){
    expenseCntrl.sharers = [];
    expenseCntrl.title = "";
    expenseCntrl.amount = 0;
    //date1 = $filter("date")(Date.now(), 'yyyy-MM-dd');
    //expenseCntrl.date=date | date:'MM/dd/yyyy';
  }
  expenseCntrl.friendList = function(){
    console.log(UserService.getFriends());
    return UserService.getFriends();
  }

  expenseCntrl.addUser = function(user){
    expenseCntrl.users.push(user);
  };

  function calculateShare(){
    var share = expenseCntrl.amount/(expenseCntrl.sharers.length);
    return share;
  };

  expenseCntrl.toggleSharerSelection=function(sharer){
    idx=expenseCntrl.sharers.indexOf(sharer);
    if (idx===-1){
      expenseCntrl.sharers.push(sharer);
    } else {
        expenseCntrl.sharers.splice(idx,1);
    }
  };

  expenseCntrl.addPersonPaid=function(personPaid){
      expenseCntrl.personPaid=personPaid;
  };

  expenseCntrl.saveExpense = function(){
    // Get the person who has paid for this expense
    console.log(expenseCntrl.personPaid.get("username"));
    console.log(expenseCntrl.sharers);
     var share = calculateShare();
     // Get the share of the 
    // expenseCntrl.users.forEach(function(user){
    //   user.share = share;
    // });
    //
    // var Expense = Parse.Object.extend("Expense");
    // var expense = new Expense();
    //
    // expense.set("title", expenseCntrl.title);
    // expense.set("amount", expenseCntrl.amount);
    // expense.set("users", expenseCntrl.users);
    //
    // expense.save(null, {
    //   success: function(expense) {
    //     // Execute any logic that should take place after the object is saved.
    //     console.log("Success in writing Expense object to the database");
    //   },
    //   error: function(expense, error) {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     alert('Failed to create new object, with error code: ' + error.message);
    //   }
    // });
  };
  init();
}]);
