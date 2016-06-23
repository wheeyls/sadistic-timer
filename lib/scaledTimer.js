import scaler from './scaler';

function scaledTimer(real, fake) {
  var me
    , timerId
    , delay = 50
    , scaled = scaler.exponential([0, real], [0, fake], 1, true)
    , start
    ;

  function tick() {
    var current = new Date()
      , value = scaled.calc(current - start)
      ;
    me.onTick(value);

    if (value === fake) {
      done();
    }
  }

  function stopTicking() {
    if (timerId !== undefined) { window.clearInterval(timerId); }
    timerId = undefined;
  }

  function done() {
    stopTicking();
    me.onDone();
  }

  me = {
    begin() {
      if (timerId !== undefined) { return; }
      start = new Date();
      timerId = window.setInterval(tick, delay);
    }

  , stop() {
      stopTicking();
      me.onStop();
    }

  , onTick() { }

  , onDone() { }

  , onStop() { }
  };

  return me;
}

export default scaledTimer;
