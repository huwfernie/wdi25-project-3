angular
  .module('runApp')
  .controller('TracksIndexCtrl', TracksIndexCtrl)
  .controller('TracksNewCtrl', TracksNewCtrl)
  .controller('TracksShowCtrl', TracksShowCtrl)
  .controller('TracksEditCtrl', TracksEditCtrl);

TracksIndexCtrl.$inject = ['Track'];
function TracksIndexCtrl(Track) {
  const vm = this;

  vm.all = Track.query();
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
  // vm.newComment = {};
  vm.track = Track.get($stateParams);
  //vm.trackResponse = Track.get($stateParams); will this get rid of track.track

  function tracksDelete() {
    //console.log('are you sure');
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

  // function addComment() {
  //   TrackComment
  //     .save({ trackId: vm.track.id }, vm.newComment)
  //     .$promise
  //     .then((comment) => {
  //       vm.track.comments.push(comment);
  //       vm.newComment = {};
  //
  //     });
  // }
  //
  // vm.addComment = addComment;
  //
  // function deleteComment(comment) {
  //   TrackComment
  //     .delete({ trackId: vm.track.id, id: comment.id })
  //     .$promise
  //     .then(() => {
  //       const index = vm.track.comments.indexOf(comment);
  //       vm.track.comments.splice(index, 1);
  //     });
  // }
  //
  // vm.deleteComment = deleteComment;
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
