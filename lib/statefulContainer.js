import $ from 'jquery';

function statefulContainer($el, opts) {
  var changeState, currentState, prevState, render;
  prevState = null;
  currentState = null;
  render = function() {
    $el.addClass(currentState).removeClass(prevState);
    $el.find(".hide-for-" + currentState).addClass('is-hidden');
    $el.find(".show-for-" + currentState).removeClass('is-hidden');
    $el.find(".hide-for-" + prevState).removeClass('is-hidden');
    return $el.find(".show-for-" + prevState).addClass('is-hidden');
  };

  changeState = function(newState) {
    if (newState === currentState) {
      return;
    }
    prevState = currentState;
    currentState = newState;

    render();
    $el.trigger('state:change', [currentState, prevState]);
  };

  $el.on('click', '[data-stateful-container-change]', function(e) {
    var newState;
    e.preventDefault();
    newState = $(this).data('stateful-container-change');
    if (newState) { changeState(newState); }
  });

  $el.on('state:set', function (e, newState) {
    if (newState) { changeState(newState); }
  });

  changeState(opts.initialState || 'start');
}

export default statefulContainer;
