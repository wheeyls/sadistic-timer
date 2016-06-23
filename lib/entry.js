import $ from 'jquery';
import scaledTimer from './scaledTimer';
import statefulContainer from './statefulContainer';
import './jquery.fittext';

function addZ(n) {
  return (n<10? '0':'') + n;
}

function hideSearch() {
  window.setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  var cent = Math.floor(ms / 10);

  if (hrs > 0) {
    return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) + '.' + addZ(cent);
  } else {
    return addZ(mins) + ':' + addZ(secs) + '.' + addZ(cent);
  }
}

$(function () {
  var currentTimer
    , $timers = $('.js-time')
    , audio = document.getElementById('buzzer')
    ;

  $('.js-stateful-container').each(function () {
    statefulContainer($(this), { initialState: 'start' });

    $(this).on('state:change', function (ev, newState) {
      $timers.fitText(0.6);
      hideSearch();

      if (newState == 'running') {
        currentTimer.begin();
      } else if (newState == 'ready') {
        currentTimer.stop();
      }
    });
  });

  function renderTimer(ms) {
    $timers.html(msToTime(ms));
  }

  function clearTimer() {
    $timers.html(msToTime(0));
  }

  function flashTimer() {
    audio.play();
    $('.js-stateful-container').trigger('state:set', 'done');
  }

  function realTime() {
    var min = parseInt($('#real-min').val()) || 0
      , sec = parseInt($('#real-sec').val()) || 0
      ;

    return ((min * 60 + sec) * 1000) || 1;
  }

  function fakeTime() {
    var min = parseInt($('#fake-min').val()) || 0
      , sec = parseInt($('#fake-sec').val()) || 0
      ;

    return ((min * 60 + sec) * 1000) || 1;
  }

  $('.js-timer-form').on('submit', function (e) {
    e.preventDefault();

    if (currentTimer) { currentTimer.stop(); }

    console.log(realTime(), fakeTime());
    currentTimer = scaledTimer(realTime(), fakeTime());
    currentTimer.onTick = renderTimer;
    currentTimer.onStop = clearTimer;
    currentTimer.onDone = flashTimer;

    $('.js-stateful-container').trigger('state:set', 'ready');
  });
});
