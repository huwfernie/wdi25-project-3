angular
  .module('runApp')
  .factory('Sprint', Sprint);

Sprint.$inject = ['$resource'];
function Sprint($resource) {
  return new $resource('/api/sprints/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
