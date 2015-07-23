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


StoryStatsStore.generateBlockStats = function (block_num) {
  'use strict';
  var block_size = CONFIG.block_size;
  var iid;

  var workers_last_stats= [];
  for (var i=0; i< block_size; i++) {
    iid = (block_num * block_size) + i;
    workers_last_stats.push(writingstats.generateBlockStats(StoryStore.get(iid)));
  }

  var workers_average_stats= [];
  for (i=0; i < (block_num * block_size); i++) {
    workers_average_stats.push(writingstats.generateBlockStats(StoryStore.get(i)));
  }

 return {
    workers_last: stats.aggregateStats(workers_last_stats),
    workers_average: stats.aggregateStats(workers_average_stats),
    population_average: this._population_stats.population_average,
    population_elite: this._population_stats.population_elite
  };
};


StoryStatsStore.all = function () {
  'use strict';
  return this._worker_stats_cache;
};


$.ajax({
  type: 'GET',
  url: '/writing_task/stats',
  dataType: 'json',
  success: function (data) {
    StoryStatsStore._population_stats = data;
  },
  error: function (a, b, c) {
    console.log(a, b, c);
  }
});




