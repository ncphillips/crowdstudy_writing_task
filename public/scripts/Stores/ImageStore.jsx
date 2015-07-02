'use strict';
if (typeof require !== 'undefined') {
  var Store = require('../Store');
}

var ImageStore = new Store();

// ImageCache
ImageStore._cache = IMAGES;

ImageStore._current = 0;

/**
 *
 */
ImageStore.d_index = ImageStore.dispatcher.register(function (action) {
  switch (action.actionType) {
    case IMAGE_ACTIONS.SET:
      this._current = action.id;
      this.emitChange();
      this._viewCurrentImage();
      break;
    case IMAGE_ACTIONS.NEXT:
      if (this.hasNext()) {
        this._current = this._current + 1;
        this.emitChange();
        this._viewCurrentImage();
      }
      break;
    case IMAGE_ACTIONS.PREVIOUS:
      if (this.hasPrevious) {
        this._current = this._current - 1;
        this.emitChange();
        this._viewCurrentImage();
      }
  }
}.bind(ImageStore));

/**
 *
 * @private
 */
ImageStore._viewCurrentImage = function () {
  if (ViewStore.get() !== VIEWS[VIEW_NAMES.IMAGE_VIEW]) {
    ViewActions.setView(VIEW_NAMES.IMAGE_VIEW);
  }
};

/**
 *
 * @param id
 * @returns {*}
 */
ImageStore.get = function (id) {
  return this._cache[id];
};

ImageStore.all = function () {
  return this._cache;
};

/**
 *
 * @returns {*}
 */
ImageStore.getCurrent = function () {
  return this._cache[this._current];
};

ImageStore.hasNext = function () {
  return (this._current + 1 < this._cache.length);
};

ImageStore.hasPrevious = function () {
  return (this._current - 1 >= 0);
};