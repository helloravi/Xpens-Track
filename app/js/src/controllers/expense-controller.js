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

  expenseCntrl.resetAll= function(){
    init();
  };

  expenseCntrl.addPersonPaid=function(personPaid){
      expenseCntrl.personPaid=personPaid;
  };

  expenseCntrl.saveExpense = function(){
    // Get the person who has paid for this expense
    console.log(expenseCntrl.personPaid.get("username"));
    console.log(expenseCntrl.sharers);
     var share = calculateShare();

     //Update the share for the sharers in the list
    expenseCntrl.sharers.forEach(function(user){
      ParseService.updateShare(user,share*(-1))
      .then(function(){
        console.log("Expense updated successfully");
      },function(){
        console.log("Expense could not be updated");
      });
    });

    // Update the share for the person paid
    ParseService.updateShare(expenseCntrl.personPaid,expenseCntrl.amount)
    .then(function(){
      console.log("Expense updated successfully");
    },function(){
      console.log("Expense could not be updated");
    });

    // Update the expenseDetails
    ParseService.createExpenseDetails(expenseCntrl.title,expenseCntrl.amount,expenseCntrl.date,
      expenseCntrl.personPaid,expenseCntrl.sharers);

  };
  init();
}]);
