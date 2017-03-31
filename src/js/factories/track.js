angular
  .module('runApp')
  .factory('Track', Track);

Track.$inject = ['$resource'];
function Track($resource) {
  return new $resource('/api/tracks/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
