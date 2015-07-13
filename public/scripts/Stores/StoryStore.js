'use strict';

if (typeof require !== 'undefined') {
  var Store = require('../Store');
  var STORY_CONST = require('../Constants/StoryConstants');
}

var StoryStore = new Store();

var example_story = {
  text: '',
  edits: [{
    text_old: '',
    text_new: '',
    time_start: 0,
    time_end: 0,
    key_presses: []
  }]
};

/**
 * Cache of stories written by the worker.
 * @private
 */
StoryStore._worker_cache = [];

/**
 * Action Listener for StoryStore
 */
StoryStore.d_index = StoryStore.dispatcher.register(function (action) {
  switch(action.actionType) {
    case STORY_ACTIONS.UPDATE:
      var story = this._worker_cache[action.iid] || {text: '', edits: []};
      story.text = action.text;
      story.edits.push(action.edit);
      this._worker_cache[action.iid] = story;
      this.emitChange();
      break;
  }
}.bind(StoryStore));

/**
 *
 * @param iid
 *
 * @description
 * When `null`, `wid` and `iid` are treated as wild cards when looking for stories.
 */
StoryStore.get = function (iid) {
  // Find the stories...
  var story = this._worker_cache[iid] || {text: '', edits: []};
  return story;
};


StoryStore.all = function () {
  return this._worker_cache;
};



