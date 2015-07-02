'use strict';
/**
 * @requires ../Constants/VIEW_ACTIONS
 * @requires ../Constants/VIEWS
 */

/**
 *
 * @type {{setImage: Function, imageImage: Function}}
 */
var ImageActions = {
  set: function (iid) {
    var action = {
      actionType: IMAGE_ACTIONS.SET,
      id: iid
    };
    CrowdDispatcher.dispatch(action);
  },
  next: function (iid) {
    var action = {
      actionType: IMAGE_ACTIONS.NEXT
    };
    CrowdDispatcher.dispatch(action);
  },
  previous: function (iid) {
    var action = {
      actionType: IMAGE_ACTIONS.PREVIOUS
    };
    CrowdDispatcher.dispatch(action);
  }
};