angular.module('Xpens-Track')
  .service('ParseService', function($q){
    ParseService=this;
    // This method is for user login
    ParseService.login = function(username, password) {
      deffered=$q.defer();
      Parse.User.logIn(username, password, {
        success: function(user) {
          deffered.resolve(user);
          console.log("Logged in as " + user.get("username"));
        }, error: function(user, error) {
          deffered.reject("Error loggin in user");
          console.log("Error logging in: " + error.message);
        }
      });
      return deffered.promise;
    };
    // This method is for user sign up
    ParseService.signup = function(username, password) {
      return Parse.User.signUp(username, password).then(function(user){
        console.log("Signed up as " + user.get("username"));
        return user;
      },function(user,error){
        console.log("Error logging in: " + error);
      });
    };

    ParseService.createUserDetails=function(user){
      var UserDetails = Parse.Object.extend("UserDetails");
      var userDetail = new UserDetails();

      userDetail.set("user_id", user.id);
      userDetail.set("net_amount", 0);
      userDetail.set("friends", []);
      // This method returns a promise
      return userDetail.save(null);
      // return userDetail.save(null).then(function(result){
      //   console.log("User Details created");
      //   console.log(result);
      //   return result;
      // },function(user,error){
      //   console.log("Error creating user details: " + error.message);
      // });
    };

    ParseService.logOut=function(){
      Parse.User.logOut();
    }

    ParseService.currentUser=function(){
      return Parse.User.current();
    }

    // This method is for searching user
    ParseService.searchUser = function(userName) {
        deffered=$q.defer();
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", userName);
        query.find().then(function(user){
          //debugger
          deffered.resolve(user[0]);
        }, function(user,error){
          console.log("Error logging in: " + error.message);
          deffered.reject("Error finding the user");
        });
      return deffered.promise;
    };

    // This method is to update the share amount after the split
    ParseService.updateShare = function(user, share) {
      var UserDetails = Parse.Object.extend("UserDetails");
      var query = new Parse.Query(UserDetails);
      query.equalTo("user_id", user.id);
      return query.find().then(function(result){
        user=result[0];
        net_amt=user.get("net_amount");
        net_amt+=share;
        user.set("net_amount",net_amt);
        return user.save(null);
      }, function(error){
        console.log("User not found, error:"+error);
        return "User not found";
      });
    };

    // Update the Expense details in the Expense Master
    ParseService.createExpenseDetails=function(expDesc,expAmt,expDate,expPaidBy,expSharers){

      var Expense = Parse.Object.extend("Expense");
      var expense = new Expense();

      expense.set("Desc", expDesc);
      expense.set("Amount", expAmt);
      expense.set("PaidBy", expPaidBy);
      expense.set("date", expDate);
      expense.set("Sharers", expSharers);
      //debugger
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

    // Add Friends of the current user to his list
    ParseService.addFriend = function(user,friendList){
      var UserDetails = Parse.Object.extend("UserDetails");
      var query = new Parse.Query(UserDetails);
      debugger
      query.equalTo("user_id", user.id);
      return query.find().then(function(result){
        debugger
        user=result[0];
        user.set("friends",friendList);
        return user.save(null);
      }, function(error){
        console.log("User not found, error:"+error);
        return "User not found";
      });
    }

    //Load List of friends
    // Add Friends of the current user to his list
    ParseService.getFriends = function(user){
      var UserDetails = Parse.Object.extend("UserDetails");
      var query = new Parse.Query(UserDetails);
      query.equalTo("user_id", user.id);
      //debugger
      return query.find().then(function(result){
        user=result[0];
        friendList=user.get("friends");
        return friendList;
      }, function(error){
        console.log("User not found, error:"+error);
        return "User not found";
      });
    }


});
