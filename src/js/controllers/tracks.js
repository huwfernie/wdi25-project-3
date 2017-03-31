angular
  .module('runApp')
  .controller('TracksIndexCtrl', TracksIndexCtrl)
  .controller('TracksNewCtrl', TracksNewCtrl)
  .controller('TracksShowCtrl', TracksShowCtrl)
  .controller('TracksEditCtrl', TracksEditCtrl);

TracksIndexCtrl.$inject = ['Track', '$scope', 'filterFilter'];
function TracksIndexCtrl(Track, $scope, filterFilter) {
  const vm = this;

  vm.all = Track.query();

  $scope.$watchGroup([
    () => vm.start,
    () => vm.finish,
    () => vm.all.$resolved
  ], () => {
    const params = {};
    if(vm.start) params.start = { name: vm.start };
    if(vm.finish) params.finish = { name: vm.finish };
    vm.allFiltered = filterFilter(vm.all, params);
    vm.filtered = {
      start: vm.allFiltered.map(track => track.start.name).filter((name, idx, arr) => arr.indexOf(name) === idx),
      finish: vm.allFiltered.map(track => track.finish.name).filter((name, idx, arr) => arr.indexOf(name) === idx)
    };
  });

  function getLatLng(track) {
    vm.startLatLng = `${track.start.lat}, ${track.start.lng}`;
    vm.finishLatLng = `${track.finish.lat}, ${track.finish.lng}`;
  }

  vm.getLatLng = getLatLng;
}

TracksNewCtrl.$inject = ['Track', '$state'];
function TracksNewCtrl(Track, $state) {
  const vm = this;
  vm.track = {};

  function tracksCreate() {
    if(vm.newForm.$valid) {
      Track
        .save(vm.track)
        .$promise
        .then(() => $state.go('tracksIndex'));
    }
  }

  vm.create = tracksCreate;
}

TracksShowCtrl.$inject = ['Track', '$stateParams', '$state', 'trackService'];
function TracksShowCtrl(Track, $stateParams, $state, trackService) {
  const vm = this;
  Track.get($stateParams)
    .$promise
    .then((data) => {
      vm.track = data.track;
      vm.sprints = data.sprints;
    });

  function tracksDelete() {
    vm.track
      .$remove()
      .then(() => $state.go('tracksIndex'));
  }

  vm.delete = tracksDelete;

  function selectTrack() {
    trackService.setTrack(vm.track);
    $state.go('sprintsNew');
  }

  vm.selectTrack = selectTrack;
}

TracksEditCtrl.$inject = ['Track', '$stateParams', '$state'];
function TracksEditCtrl(Track, $stateParams, $state) {
  const vm = this;

  vm.track = Track.get($stateParams);

  function tracksUpdate() {
    vm.track
      .$update()
      .then(() => $state.go('tracksShow', $stateParams));
  }

  vm.update = tracksUpdate;
}
