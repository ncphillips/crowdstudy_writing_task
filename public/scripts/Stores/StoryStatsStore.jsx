'use strict';

var StoryStatsStore = new Store();

var example_stats = {
  story_length: 0,
  num_edits: 0,
  key_presses: 0,
  time_spent: 0
};

/**
 * Cache of stories written by the worker.
 * @private
 */
StoryStatsStore._worker_stats_cache = [];

/**
 * Action Listener for StoryStatsStore
 */
StoryStatsStore.d_index = StoryStatsStore.dispatcher.register(function (action) {
  switch(action.actionType) {
    case STORY_ACTIONS.UPDATE:
      this.emitChange();
      break;
  }
}.bind(StoryStatsStore));


StoryStatsStore.generateWorkerStats = function (iid) {
  var story = StoryStore.get(iid);
  var stats = {
    story_length: story.text.length,
    num_edits: story.edits.length,
    key_presses: 0,
    time_spent: 0
  };
  story.edits.forEach(function (edit) {
    stats.key_presses += edit.key_presses.length;
    stats.time_spent += edit.time_end - edit.time_start;
  });
  return stats;
};


/**
 *
 * @param iid
 *
 * @description
 * When `null`, `wid` and `iid` are treated as wild cards when looking for stories.
 */
StoryStatsStore.get = function (iid) {
  // Find the stories...
  return this.generateWorkerStats(iid);
};


StoryStatsStore.all = function () {
  return this._worker_stats_cache;
};



