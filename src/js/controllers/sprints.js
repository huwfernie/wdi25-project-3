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

  vm.track = trackService.getTrack();
  if(!vm.track) {
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

      if(!response.data.responses[0].landmarkAnnotations) {
        const err = new Error('No landmarks found');
        err.status = 404;
        err.data = { message: 'Whoa there; we searched the image you just uploaded and didn\'t find any landmarks in it, <p><em>please upload another image to start your run.</em></p>' };
        return $rootScope.$broadcast('error', err);
      }

      const latLng = response.data.responses[0].landmarkAnnotations[0].locations[0].latLng;

      if((vm.track.start.lat.toFixed(2) !== latLng.latitude.toFixed(2)) || (vm.track.start.lng.toFixed(2) !== latLng.longitude.toFixed(2))) {
        const err = new Error('Wrong location');
        err.status = 404;
        err.data = { message: 'Hold on, your photo has a landmark in it that  doesn\'t match the start position, try uploading another' };
        return $rootScope.$broadcast('error', err);
      }

      vm.sprint.track = vm.track.id;

      Sprint
        .save(vm.sprint)
        .$promise
        .then((sprint) => $state.go('sprintsShow', { id: sprint.id }));
    });
  }



  vm.create = sprintsCreate;
}

SprintsShowCtrl.$inject = ['Sprint', '$stateParams', '$state', '$http', 'trackService', '$rootScope'];
function SprintsShowCtrl(Sprint, $stateParams, $state, $http, trackService, $rootScope) {
  const vm = this;

  vm.sprint = Sprint.get($stateParams);
  vm.track = trackService.getTrack();

  if(!vm.track) {
    $state.go('tracksIndex'); // handle this error more gracefully with $broadcast or something...
  }

  function sprintsDelete() {
    vm.sprint
      .$remove()
      .then(() => $state.go('tracksIndex'));
  }
  vm.delete = sprintsDelete;


  function sprintsFinish() {
    console.log('finish');
    console.log(vm.sprint);
    console.log('track');
    console.log(vm.track);

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
      if(!response.data.responses[0].landmarkAnnotations) {
        const err = new Error('No landmarks found');
        err.status = 404;
        err.data = { message: 'Whoa there; we searched the finish image you just uploaded and didn\'t find any landmarks in it, <p><em>please upload another picture to finish your run.</em></p>' };
        return $rootScope.$broadcast('error', err);
      }

      const latLng = response.data.responses[0].landmarkAnnotations[0].locations[0].latLng;

      if((vm.track.finish.lat.toFixed(2) !== latLng.latitude.toFixed(2)) || (vm.track.finish.lng.toFixed(2) !== latLng.longitude.toFixed(2))) {
        const err = new Error('Wrong location');
        err.status = 404;
        err.data = { message: 'Hold on, your finish photo has a landmark in it that  doesn\'t match the finish position, try uploading another picture' };
        return $rootScope.$broadcast('error', err);
      }

      console.log('now');
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
