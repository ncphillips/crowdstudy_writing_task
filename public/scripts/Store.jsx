var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('CrowdDispatcher');

var Store = function () {

  var _this = new EventEmitter();

  _this.dispatcher = Dispatcher;

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

module.exports = Store;
