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

SprintsNewCtrl.$inject = ['Sprint', '$state', '$http', 'trackService', '$rootScope'];
function SprintsNewCtrl(Sprint, $state, $http, trackService, $rootScope) {
  const vm = this;
  vm.sprint = {};

  const track = trackService.getTrack();


  if(!track) {
    $state.go('tracksIndex'); // handle this error more gracefully with $broadcast or something...
  }

  function sprintsCreate() {
    const base64Data = vm.sprint.base64.match(/base64,(.*)$/)[1];
    const data = {
      requests: [{
        image: { content: base64Data },
        features: [{ type: 'LANDMARK_DETECTION' }]
      }]
    };
    $http
    .post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU', data)
    .then((response) => {
      console.log('response', response);
      const latLng = response.data.responses[0].landmarkAnnotations[0].locations[0].latLng;

      if(track.track.start.lat !== latLng.latitude || track.track.start.lng !== latLng.longitude) {
        console.log('false - you\'re start photo doesn\'t match');
        $rootScope.$broadcast('start-photo-fail');
        //return false; // handle this error more gracefully with $broadcast or something...
      }

      //console.log('now');
      //console.log(vm.user);
      //vm.sprint.track = track;
      // vm.sprint.createdBy = vm.user.id; // huw
      vm.sprint.track = track.track.id; // huw
      //console.log('track is', track);
      //console.log('vm.sprint: ', vm.sprint);
      // console.log(track);
      // console.log(response);

      Sprint
        .save(vm.sprint)
        .$promise
        .then((sprint) => $state.go('sprintsShow', { id: sprint.id }));
    });
  }



  vm.create = sprintsCreate;
}

SprintsShowCtrl.$inject = ['Sprint', '$stateParams', '$state', '$http', 'trackService'];
function SprintsShowCtrl(Sprint, $stateParams, $state, $http, trackService) {
  const vm = this;

  vm.sprint = Sprint.get($stateParams);
  const track = trackService.getTrack();

  if(!track) {
    $state.go('tracksIndex'); // handle this error more gracefully with $broadcast or something...
  }

  function sprintsDelete() {
    vm.sprint
      .$remove()
      .then(() => $state.go('sprintsIndex'));
  }
  vm.delete = sprintsDelete;

  function sprintsFinish() {
    console.log('finish');
    console.log(vm.sprint);
    const base64Data = vm.sprint.base64.match(/base64,(.*)$/)[1];
    const data = {
      requests: [{
        image: { content: base64Data },
        features: [{ type: 'LANDMARK_DETECTION' }]
      }]
    };
    $http
    .post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU', data)
    .then((response) => {
      //console.log('response', response);
      const latLng = response.data.responses[0].landmarkAnnotations[0].locations[0].latLng;

      if(track.track.finish.lat !== latLng.latitude || track.track.finish.lng !== latLng.longitude) {
        console.log('false - you\'re finish photo doesn\'t match');
        vm.sprint.finish.time = null;
        //return false; // handle this error more gracefully with $broadcast or something...
      }
      vm.sprint
      .$update()
      .then(() => $state.go('sprintsShow', $stateParams));
    });
  }
  vm.finish = sprintsFinish;

  // used to switch between views on the show page
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
