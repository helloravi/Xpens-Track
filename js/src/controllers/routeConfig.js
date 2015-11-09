angular.module('Xpens-Track')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "view/home.tmpl.html",
      controller: "UserController",
      controllerAs: "userCntrl",
      authenticate: false
    })
    .state('expenses', {
      url: "/expenses",
      templateUrl: "view/expenses.tmpl.html",
      controller: "ExpenseController",
      controllerAs: "expenseCntrl",
      authenticate: true
    })
    .state('user', {
      url: "/user",
      templateUrl: "view/user.tmpl.html",
      controller: "UserController",
      controllerAs: "userCntrl",
      authenticate: true
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "view/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});