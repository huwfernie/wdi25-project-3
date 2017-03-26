angular
  .module('runApp')
  .factory('Track', Track);
  // .factory('TrackReview', TrackReview);


Track.$inject = ['$resource'];
function Track($resource) {
  return new $resource('/api/tracks/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
//
// TrackReview.$inject = ['$resource'];
// function TrackReview($resource) {
//   return new $resource('/api/tracks/:trackId/reviews/:id', { id: '@id' }, {
//     update: { method: 'PUT' }
//   });
// }
