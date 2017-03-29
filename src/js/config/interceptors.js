angular
  .module('runApp')
  .config(Interceptors);

Interceptors.$inject = ['$httpProvider'];
function Interceptors($httpProvider) {
  $httpProvider.interceptors.push('ErrorHandler');
  $httpProvider.interceptors.push('GoogleVision');
}
