angular
  .module('runApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth'];
function MainCtrl($rootScope, $state, $auth) {
  const vm = this;
  vm.isNavCollapsed = true;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    if(err.status === 401) $state.go('login');
  });

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    vm.pageName = toState.name;
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;
  });

  function logout() {
    $auth.logout();
    $state.go('home');
  }

  vm.logout = logout;
}
