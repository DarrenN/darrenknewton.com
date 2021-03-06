// Generated by CoffeeScript 1.6.3
(function() {
  var EventedArray, root,
    __slice = [].slice;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  EventedArray = (function() {
    function EventedArray() {
      var values;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.values = values;
      this.events = {};
      if (((typeof _ !== "undefined" && _ !== null) && typeof _ === "function") === false) {
        throw new Error("Underscore.js is required");
      }
    }

    EventedArray.prototype.set = function() {
      var v, values, _i, _len, _results;
      values = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (values.length > 1) {
        _results = [];
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          v = values[_i];
          _results.push(this.set(v));
        }
        return _results;
      } else {
        if ((this.buffer_length != null) && this.values.length >= this.buffer_length) {
          this.shift();
        }
        this.values.push(values[0]);
        return this.trigger('set', values[0]);
      }
    };

    EventedArray.prototype.get = function(index) {
      var val;
      if (this.values[index] != null) {
        val = this.values[index];
      }
      if (val != null) {
        return this.trigger('get', val);
      }
    };

    EventedArray.prototype.remove = function(value) {
      var index, val, values;
      index = _.indexOf(this.values, value);
      if (index === -1) {
        return this.trigger('remove', false);
      }
      val = this.values[index];
      values = this.values.slice(0, index).concat(_.rest(this.values, index + 1));
      this.values = values;
      return this.trigger('remove', val);
    };

    EventedArray.prototype.pop = function() {
      this.values.pop();
      return this.trigger('pop');
    };

    EventedArray.prototype.shift = function() {
      return this.trigger('shift', this.values.shift());
    };

    EventedArray.prototype.each = function(fn, context) {
      var _this = this;
      return _.each(this.values, function(v) {
        _this.trigger('each', v);
        return fn(v);
      }, context);
    };

    EventedArray.prototype.map = function(fn, context) {
      return this.trigger('map', _.map(this.values, fn, context));
    };

    EventedArray.prototype.forEach = function(fn, context) {
      return this.each(fn, context);
    };

    EventedArray.prototype.reduce = function(fn, memo, context) {
      return this.trigger('reduce', _.reduce(this.values, fn, memo, context));
    };

    EventedArray.prototype.reduceRight = function(fn, memo, context) {
      return this.trigger('reduceRight', _.reduce(this.values, fn, memo, context));
    };

    EventedArray.prototype.filter = function(fn, context) {
      return this.trigger('filter', _.filter(this.values, fn, context));
    };

    EventedArray.prototype.reject = function(fn, context) {
      return this.trigger('reject', _.reject(this.values, fn, context));
    };

    EventedArray.prototype.every = function(fn, context) {
      return this.trigger('every', _.every(this.values, fn, context));
    };

    EventedArray.prototype.all = function(fn, context) {
      return this.trigger('all', _.every(this.values, fn, context));
    };

    EventedArray.prototype.any = function(fn, context) {
      return this.trigger('any', _.any(this.values, fn, context));
    };

    EventedArray.prototype.some = function(fn, context) {
      return this.trigger('some', _.any(this.values, fn, context));
    };

    EventedArray.prototype.contains = function(target) {
      return this.trigger('contains', _.contains(this.values, target));
    };

    EventedArray.prototype.shuffle = function() {
      return this.trigger('shuffle', _.shuffle(this.values));
    };

    /*
    # Accessors without events - for quickly getting at values
    */


    EventedArray.prototype.first = function(n) {
      return _.first(this.values, n);
    };

    EventedArray.prototype.rest = function(n) {
      return _.rest(this.values, n);
    };

    EventedArray.prototype.initial = function(n) {
      return _.initial(this.values, n);
    };

    EventedArray.prototype.last = function(n) {
      return _.last(this.values, n);
    };

    EventedArray.prototype.indexOf = function(item) {
      return _.indexOf(this.values, item);
    };

    /*
    # Event Handling
    */


    EventedArray.prototype.register = function(event, fn) {
      return this.events[event] = fn;
    };

    EventedArray.prototype.deregister = function(event) {
      if (this.events[event] != null) {
        return delete this.events[event];
      }
    };

    EventedArray.prototype.trigger = function() {
      var args, event;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((event != null) && (this.events[event] != null)) {
        this.events[event](this.cleanReturnVal(args));
      }
      return this.cleanReturnVal(args);
    };

    EventedArray.prototype.cleanReturnVal = function(val) {
      if (_.isArray(val) && val.length === 1) {
        return val[0];
      } else {
        return val;
      }
    };

    EventedArray.prototype.toString = function() {
      return JSON.stringify(this.values);
    };

    EventedArray.prototype.setBuffer = function(buffer_length) {
      var v, _i, _len, _ref, _results;
      this.buffer_length = buffer_length;
      if (this.values.length > 0 && this.values.length > this.buffer_length) {
        _ref = this.values.slice(0, this.values.length - this.buffer_length);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          _results.push(this.shift(v));
        }
        return _results;
      }
    };

    return EventedArray;

  })();

  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = EventedArray;
  } else if (typeof exports === 'object' && exports) {
    exports.EventedArray = EventedArray;
  } else if (typeof define === 'function' && define.amd) {
    define('eventedarray', [], function() {
      return EventedArray;
    });
  } else {
    root.EventedArray = EventedArray;
  }

}).call(this);
