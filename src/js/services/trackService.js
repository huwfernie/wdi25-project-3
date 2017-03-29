angular
  .module('runApp')
  .controller('trackService', trackService);

function trackService() {
  let _track = null;

  this.getTrack = function getTrack() {
    return _track;
  };

  this.setTrack = function setTrack(track) {
    _track = track;
  };
}
