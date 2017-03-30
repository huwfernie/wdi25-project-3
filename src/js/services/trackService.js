angular
  .module('runApp')
  .service('trackService', trackService);

trackService.$inject = ['$window'];
function trackService($window) {
  this.getTrack = function getTrack() {
    return JSON.parse($window.localStorage.getItem('track'));
  };

  this.setTrack = function setTrack(track) {
    return $window.localStorage.setItem('track', JSON.stringify(track));
  };

}
