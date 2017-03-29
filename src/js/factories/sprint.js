angular
  .module('runApp')
  .factory('Sprint', Sprint);

Sprint.$inject = ['$resource'];
function Sprint($resource) {
  return new $resource('/api/sprints/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

Object.defineProperty(Sprint.prototype, 'formattedDuration', {
  get: function formattedDuration() {
    var secs = this.duration % 60;
    var minutes = Math.floor(this.duration % 3600 / 60);
    var hours = Math.floor(this.duration / 3600);

    return (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (secs > 9 ? secs : '0' + secs);
  }
});
