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
StoryStatsStore._stats = [];

/**
 * Action Listener for StoryStatsStore
 */
StoryStatsStore.d_index = StoryStatsStore.dispatcher.register(function (action) {
  'use strict';
  switch(action.actionType) {
    case STORY_STATS_ACTIONS.LOAD_BLOCK_STATS:
      this._stats = action.stats;
      this.emitChange();
      break;
  }
}.bind(StoryStatsStore));


StoryStatsStore.get = function () {
  'use strict';
  return this._stats;
};

StoryStatsStore.generateWorkerStats = function (iid) {
  'use strict';
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
