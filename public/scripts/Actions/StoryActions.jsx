'use strict';

var StoryActions = {
  update: function (iid, text, edit) {
    var action = {
      actionType: STORY_ACTIONS.UPDATE,
      iid: iid,
      text: text,
      edit: edit
    };
    var worker = WorkerStore.get();
    var experiment = ExperimentStore.get();
    if (!experiment.data) {
      experiment.data = [];
    }
    if (!experiment.data[iid]) {
      experiment.data[iid] = {iid:iid, text: '', edits: []};
    }

    experiment.data[iid].text = text;
    edit.time_start = Number(edit.time_start);
    edit.time_end = Number(edit.time_end);
    experiment.data[iid].edits.push(edit);


    ExperimentActions.update(worker._id, 'writing_task', experiment);
    CrowdDispatcher.dispatch(action);
  }
};


var StoryStatsActions = (function() {
  function setStats(data) {
    var action = {
      actionType: STORY_STATS_ACTIONS.LOAD_BLOCK_STATS,
      stats: data
    };

    CrowdDispatcher.dispatch(action);
  }

  return {
    load_block_stats: function (wid, block_num, block_size) {
      if (typeof block_size === 'undefined') {
        block_size = CONFIG.block_size;
      }

      $.ajax({
        type: 'GET',
        url: '/writing_task/' + wid + '/stats?block_num=' + block_num + '&block_size=' + block_size,
        dataType: 'json',
        success: setStats,
        error: function (a, b, c) {
          console.log(a, b, c);
        }
      });
    }
  };
})();
