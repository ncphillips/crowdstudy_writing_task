'use strict';
if (typeof require !== 'undefined') {
  var Store = require('../Store');
  var VIEWS = require('../Constants/VIEWS');
}

var ViewStore = new Store();

// ImageCache
ViewStore._view_name = VIEW_NAMES.INSTRUCTIONS;

ViewStore.d_index = ViewStore.dispatcher.register(function (action) {
  switch(action.actionType) {
    case VIEW_ACTIONS.CHANGE:
      ViewStore._view_name = action.name;
      ViewStore.emitChange();
      break;
  }
});

ViewStore.get = function () {
  return VIEWS[this._view_name];
};

