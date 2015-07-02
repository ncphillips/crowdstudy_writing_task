'use strict';
/**
 * @requires ../Constants/VIEW_ACTIONS
 * @requires ../Constants/VIEWS
 */

/**
 *
 * @type {{setView: Function, imageView: Function}}
 */
var ViewActions = {
  setView: function (name) {
    var action = {
      actionType: VIEW_ACTIONS.CHANGE,
      name: name
    };
    CrowdDispatcher.dispatch(action);
  }
};