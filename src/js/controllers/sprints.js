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

SprintsNewCtrl.$inject = ['Sprint', '$state', '$http'];
function SprintsNewCtrl(Sprint, $state, $http) {
  const vm = this;
  vm.sprint = {};

  function sprintsCreate() {
    console.log('sprintsCreate working???');
    Sprint
      .save(vm.sprint)
      .$promise
      .then((response) => {
        console.log(response);
        //console.log(`base 64 ${vm.sprint.base64}`);
        const base64Data = vm.sprint.base64.match(/base64,(.*)$/)[1];
        const data = `{
        "requests": [
          {
            "image": {
              "content": "${base64Data}"
            },
            "features": [
              {
                "type": "LANDMARK_DETECTION"
              }
            ]
          }
        ]
      }`;

        $http
          .post(`https://vision.googleapis.com/v1/images:annotate?key=${response.googleKey}`, data)
          .then((response) => {
            console.log(response);
          });
      });
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
    // $state.reload();
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
