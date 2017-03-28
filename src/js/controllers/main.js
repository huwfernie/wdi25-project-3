angular
  .module('runApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;
  vm.isNavCollapsed = false;

  vm.isAuthenticated = $auth.isAuthenticated;
  // rootscope is listening - it will pick up any 'error'
  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    console.log(e, err);
    vm.message = err.data.message; // this is the message from the server
    if(err.status === 401) $state.go('login'); // redirect to login.
  });

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    vm.pageName = toState.name;
  });

  $rootScope.$on('stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;

  });

  function logout() {
    $auth.logout();
    $state.go('home'); // redirect to login page
  }

  vm.logout = logout;

  function click() {
    console.log('click');
  }

  vm.click = click;

}
