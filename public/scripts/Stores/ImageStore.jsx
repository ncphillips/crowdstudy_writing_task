'use strict';
if (typeof require !== 'undefined') {
  var Store = require('../Store');
}

var ImageStore = new Store();

// ImageCache
ImageStore._cache = [];

ImageStore.d_index = ImageStore.dispatcher(function (action) {
  console.log("ImageStore – Callback called...back");
});

ImageStore.get = function (id) {
  if (id)  {
    return ImageStore._cache[id];
  }
  else {
    return ImageStore._cache;
  }
};
