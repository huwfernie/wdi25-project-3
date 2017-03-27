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
    console.log('sprintsCreate working???');
    Sprint
      .save(vm.sprint)
      .$promise
      .then((sprint) => $state.go('sprintsShow', { id: sprint.id}));

  }

  vm.create = sprintsCreate;
}

SprintsShowCtrl.$inject = ['Sprint', '$stateParams', '$state'];
function SprintsShowCtrl(Sprint, $stateParams, $state) {
  const vm = this;

  vm.sprint = Sprint.get($stateParams);

  vm.isRunning = true;
  vm.isStopped = false;


  function sprintsDelete() {
    vm.sprint
      .$remove()
      .then(() => $state.go('sprintsIndex'));
  }
  vm.delete = sprintsDelete;

  function sprintsFinish() {
    console.log('finish');
    console.log(vm.sprint);
    vm.sprint
    .$update()
    .then(() => $state.go('sprintsShow', $stateParams));

  }
  vm.finish = sprintsFinish;

  function takeFinishPhoto(){
    vm.sprint.finish.time = new Date();
    $state.reload();
  }
  vm.takeFinishPhoto = takeFinishPhoto;

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
