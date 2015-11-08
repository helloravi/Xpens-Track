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
      controller: "HomeController",
      controllerAs: "homeCntrl"
    })
    .state('tasks.list', {
      url: "/tasks",
      templateUrl: "view/tasks.list.tmpl.html",
      controller: "taskController",
      controllerAs: "taskCntrl"
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "view/state2.html"
    })
    .state('state2.list', {
      url: "/list",
      templateUrl: "view/state2.list.html",
      controller: function($scope) {
        $scope.things = ["A", "Set", "Of", "Things"];
      }
    });
});