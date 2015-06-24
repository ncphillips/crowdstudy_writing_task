'use strict';
if (typeof require !== 'undefined') {
  var Store = require('../Store');
}

var AppStore = new Store();

AppStore.d_index = AppStore.dispatcher(function (action) {
  console.log("AppStore – Callback called...back");
});



