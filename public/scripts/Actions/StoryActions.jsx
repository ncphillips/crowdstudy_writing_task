'use strict';

var StoryActions = {
  update: function (iid, text, edit) {
    var action = {
      actionType: STORY_ACTIONS.UPDATE,
      iid: iid,
      text: text,
      edit: edit
    };
    CrowdDispatcher.dispatch(action);
  }
};