import $ from 'jquery';

var scaler = {
  normalize: function (domain, range) {
    return {
      normal_domain: Math.abs(domain[1] - domain[0])
    , normal_range: Math.abs(range[1] - range[0])
    , min_domain: Math.min(domain[0], domain[1])
    , min_range: Math.min(range[0], range[1])
    , max_range: Math.max(range[0], range[1])
    };
  }

, exponential: function (domain, range, power, isConstrained) {
    var me = $.extend(scaler.normalize(domain, range), {
        calc: function (value) {
          var normal_num = value - me.min_domain
          , inter = normal_num / me.normal_domain
          ;

          return me.constrain(me.min_range + (me.normal_range * Math.pow(inter, power)));
        }

      , constrain: function (value) {
          if (!isConstrained) { return value; }

          if (value > me.max_range) {
            value = me.max_range;
          } else if (value < me.min_range) {
            value = me.min_range;
          }

          return value;
        }
      })
    ;

    return me;
  }

, linear: function (domain, range) {
    return scaler.exponential(domain, range, 1);
  }
};

export default scaler;
