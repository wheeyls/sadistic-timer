(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define(["jQuery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jQuery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _scaledTimer = __webpack_require__(3);

	var _scaledTimer2 = _interopRequireDefault(_scaledTimer);

	var _statefulContainer = __webpack_require__(5);

	var _statefulContainer2 = _interopRequireDefault(_statefulContainer);

	__webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addZ(n) {
	  return (n < 10 ? '0' : '') + n;
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

	(0, _jquery2.default)(function () {
	  var currentTimer,
	      $timers = (0, _jquery2.default)('.js-time'),
	      audio = document.getElementById('buzzer');

	  (0, _jquery2.default)('.js-stateful-container').each(function () {
	    (0, _statefulContainer2.default)((0, _jquery2.default)(this), { initialState: 'start' });

	    (0, _jquery2.default)(this).on('state:change', function (ev, newState) {
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
	    (0, _jquery2.default)('.js-stateful-container').trigger('state:set', 'done');
	  }

	  function realTime() {
	    var min = parseInt((0, _jquery2.default)('#real-min').val()) || 0,
	        sec = parseInt((0, _jquery2.default)('#real-sec').val()) || 0;

	    return (min * 60 + sec) * 1000 || 1;
	  }

	  function fakeTime() {
	    var min = parseInt((0, _jquery2.default)('#fake-min').val()) || 0,
	        sec = parseInt((0, _jquery2.default)('#fake-sec').val()) || 0;

	    return (min * 60 + sec) * 1000 || 1;
	  }

	  (0, _jquery2.default)('.js-timer-form').on('submit', function (e) {
	    e.preventDefault();

	    if (currentTimer) {
	      currentTimer.stop();
	    }

	    console.log(realTime(), fakeTime());
	    currentTimer = (0, _scaledTimer2.default)(realTime(), fakeTime());
	    currentTimer.onTick = renderTimer;
	    currentTimer.onStop = clearTimer;
	    currentTimer.onDone = flashTimer;

	    (0, _jquery2.default)('.js-stateful-container').trigger('state:set', 'ready');
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _scaler = __webpack_require__(4);

	var _scaler2 = _interopRequireDefault(_scaler);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function scaledTimer(real, fake) {
	  var me,
	      timerId,
	      delay = 50,
	      scaled = _scaler2.default.exponential([0, real], [0, fake], 1, true),
	      start;

	  function tick() {
	    var current = new Date(),
	        value = scaled.calc(current - start);
	    me.onTick(value);

	    if (value === fake) {
	      done();
	    }
	  }

	  function stopTicking() {
	    if (timerId !== undefined) {
	      window.clearInterval(timerId);
	    }
	    timerId = undefined;
	  }

	  function done() {
	    stopTicking();
	    me.onDone();
	  }

	  me = {
	    begin: function begin() {
	      if (timerId !== undefined) {
	        return;
	      }
	      start = new Date();
	      timerId = window.setInterval(tick, delay);
	    },
	    stop: function stop() {
	      stopTicking();
	      me.onStop();
	    },
	    onTick: function onTick() {},
	    onDone: function onDone() {},
	    onStop: function onStop() {}
	  };

	  return me;
	}

	exports.default = scaledTimer;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var scaler = {
	  normalize: function normalize(domain, range) {
	    return {
	      normal_domain: Math.abs(domain[1] - domain[0]),
	      normal_range: Math.abs(range[1] - range[0]),
	      min_domain: Math.min(domain[0], domain[1]),
	      min_range: Math.min(range[0], range[1]),
	      max_range: Math.max(range[0], range[1])
	    };
	  },

	  exponential: function exponential(domain, range, power, isConstrained) {
	    var me = _jquery2.default.extend(scaler.normalize(domain, range), {
	      calc: function calc(value) {
	        var normal_num = value - me.min_domain,
	            inter = normal_num / me.normal_domain;

	        return me.constrain(me.min_range + me.normal_range * Math.pow(inter, power));
	      },

	      constrain: function constrain(value) {
	        if (!isConstrained) {
	          return value;
	        }

	        if (value > me.max_range) {
	          value = me.max_range;
	        } else if (value < me.min_range) {
	          value = me.min_range;
	        }

	        return value;
	      }
	    });

	    return me;
	  },

	  linear: function linear(domain, range) {
	    return scaler.exponential(domain, range, 1);
	  }
	};

	exports.default = scaler;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function statefulContainer($el, opts) {
	  var changeState, currentState, prevState, render;
	  prevState = null;
	  currentState = null;
	  render = function render() {
	    $el.addClass(currentState).removeClass(prevState);
	    $el.find(".hide-for-" + currentState).addClass('is-hidden');
	    $el.find(".show-for-" + currentState).removeClass('is-hidden');
	    $el.find(".hide-for-" + prevState).removeClass('is-hidden');
	    return $el.find(".show-for-" + prevState).addClass('is-hidden');
	  };

	  changeState = function changeState(newState) {
	    if (newState === currentState) {
	      return;
	    }
	    prevState = currentState;
	    currentState = newState;

	    render();
	    $el.trigger('state:change', [currentState, prevState]);
	  };

	  $el.on('click', '[data-stateful-container-change]', function (e) {
	    var newState;
	    e.preventDefault();
	    newState = (0, _jquery2.default)(this).data('stateful-container-change');
	    if (newState) {
	      changeState(newState);
	    }
	  });

	  $el.on('state:set', function (e, newState) {
	    if (newState) {
	      changeState(newState);
	    }
	  });

	  changeState(opts.initialState || 'start');
	}

	exports.default = statefulContainer;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function ($) {

	  $.fn.fitText = function (kompressor, options) {

	    // Setup options
	    var compressor = kompressor || 1,
	        settings = $.extend({
	      'minFontSize': Number.NEGATIVE_INFINITY,
	      'maxFontSize': Number.POSITIVE_INFINITY
	    }, options);

	    return this.each(function () {

	      // Store the object
	      var $this = $(this);

	      // Resizer() resizes items based on the object width divided by the compressor * 10
	      var resizer = function resizer() {
	        $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
	      };

	      // Call once to set.
	      resizer();

	      // Call on resize. Opera debounces their resize by default.
	      $(window).on('resize.fittext orientationchange.fittext', resizer);
	    });
	  };
	})(jQuery); /*global jQuery */
	/*!
	* FitText.js 1.2
	*
	* Copyright 2011, Dave Rupert http://daverupert.com
	* Released under the WTFPL license
	* http://sam.zoy.org/wtfpl/
	*
	* Date: Thu May 05 14:23:00 2011 -0600
	*/

/***/ }
/******/ ])
});
;