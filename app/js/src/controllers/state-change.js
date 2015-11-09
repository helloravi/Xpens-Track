angular.module('Xpens-Track')
.run(function($rootScope, $state,AuthenticationService) {
    $rootScope.$on( "$stateChangeStart", function(event,toState, toParams, fromState, fromParams) {
      if (toState.authenticate && !AuthenticationService.loggedIn()){
        $state.transitionTo("home");
        event.preventDefault();
      }
    });
  });
