angular
  .module('runApp')
  .service('buildStopwatch', buildStopwatch);

function buildStopwatch() {
//  console.log('Stopwatch ready');
  var stopwatch = document.getElementById('stopwatch'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

  function add() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }

    stopwatch.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    timer();
  }

  function timer() {
    t = setTimeout(add, 1000);
  }

  // timer();

  /* Start button */
  if(start) start.onclick = timer ;

  /* Stop button */
  if(stop) stop.onclick = function() {
    clearTimeout(t);
  };

  // this.stopTime = function() {
  //   clearTimeout(t);
  // };

  /* Clear button */
  if(clear) clear.onclick = function() {
    stopwatch.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);  seconds = 0; minutes = 0; hours = 0;
  };
}
