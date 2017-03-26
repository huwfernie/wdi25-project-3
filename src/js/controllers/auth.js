angular
  .module('runApp')
  .controller('RegisterCtrl', RegisterCtrl) // name the function
  .controller('LoginCtrl', LoginCtrl); // name the function


RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.signup(vm.user)
      .then(() => $state.go('login'));
  }

  vm.submit = submit;
}


LoginCtrl.$inject = ['$auth', '$state'];
function LoginCtrl($auth, $state) {
  const vm = this;
  vm.credentials = {};

  function submit() {
    $auth.login(vm.credentials)
      .then(() => $state.go('sprintsIndex'));
  }

  vm.submit = submit;
}
