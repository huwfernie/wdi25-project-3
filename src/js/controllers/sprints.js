angular
  .module('runApp')
  .controller('SprintsIndexCtrl', SprintsIndexCtrl)
  .controller('SprintsNewCtrl', SprintsNewCtrl)
  .controller('SprintsShowCtrl', SprintsShowCtrl)
  .controller('SprintsEditCtrl', SprintsEditCtrl);

SprintsIndexCtrl.$inject = ['Sprint'];
function SprintsIndexCtrl(Sprint) {
  const vm = this;

  vm.all = Sprint.query();
}

SprintsNewCtrl.$inject = ['Sprint', '$state'];
function SprintsNewCtrl(Sprint, $state) {
  const vm = this;
  vm.sprint = {};

  function sprintsCreate() {
    Sprint
      .save(vm.sprint)
      .$promise
      .then(() => $state.go('sprintsShow'));
  }

  vm.create = sprintsCreate;
}

SprintsShowCtrl.$inject = ['Sprint', '$stateParams', '$state'];
function SprintsShowCtrl(Sprint, $stateParams, $state) {
  const vm = this;

  vm.sprint = Sprint.get($stateParams);

  function sprintsDelete() {
    vm.sprint
      .$remove()
      .then(() => $state.go('sprintsIndex'));
  }

  vm.delete = sprintsDelete;
}

SprintsEditCtrl.$inject = ['Sprint', '$stateParams', '$state'];
function SprintsEditCtrl(Sprint, $stateParams, $state) {
  const vm = this;

  vm.sprint = Sprint.get($stateParams);

  function sprintsUpdate() {
    vm.sprint
      .$update()
      .then(() => $state.go('sprintsShow', $stateParams));
  }

  vm.update = sprintsUpdate;
}
