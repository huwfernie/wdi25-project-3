angular
  .module('runApp')
  .factory('GoogleVision', GoogleVision);

function GoogleVision() {
  return {
    request: function(config) {
      if(config.url.startsWith('https://vision.googleapis.com')) {
        delete config.headers.Authorization;
      }
      return config;
    }
  };
}
