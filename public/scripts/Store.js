'use strict';

var EventEmitter = null;

if (typeof require !== 'undefined') {
  EventEmitter = require('events').EventEmitter;
  var CrowdDispatcher = require('CrowdDispatcher');

} else {
  EventEmitter = function () {
    return {
      _callbacks: [],
      on: function (event, callback) {
        this._callbacks.push(callback);
      },
      remove: function (callback) {

      },
      emit: function () {
        this._callbacks.forEach(function (callback) {
          callback();
        });
      }
    };
  };
}

var Store = function () {

  var _this = new EventEmitter();

  _this.dispatcher = CrowdDispatcher;

  _this.emitChange = function () {
    _this.emit('change');
  };

  _this.addChangeListener = function (callback) {
    _this.on('change', callback);
  };

  _this.removeChangeListener = function (callback) {
    _this.remove('change', callback);
  };

  return _this;
};

if (typeof module !== 'undefined') {
  module.exports = Store;
}
