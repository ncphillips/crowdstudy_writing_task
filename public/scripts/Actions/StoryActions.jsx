'use strict';

var StoryActions = {
  _updatingStory: false,
  _nextAction: {actionType: '',},
  update: function (iid, text, edit) {
    StoryActions._nextAction = {
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

    StoryActions._updatingStory = true;
    ExperimentActions.update(worker._id, 'writing_task', experiment);
  },
  _dispatchUpdate: function(){
    /**
     * Gets called anytime an Experiment is updated, and dispatches if
     * StoryActions is currently updating, which means that the Experiment
     * update is a result of this thing or whatever.
     */
    var experiment = ExperimentStore.get();
    var image = ImageStore.getCurrent();
    if (StoryActions._updatingStory &&
      StoryActions._nextAction.iid >= 0 &&
      experiment.data.length > StoryActions._nextAction.iid) {
      StoryActions._updatingStory = false;
      CrowdDispatcher.dispatch(StoryActions._nextAction);
    }
  }
};
ExperimentStore.addChangeListener(StoryActions._dispatchUpdate);

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
      var experiment = ExperimentStore.get();
      if (!StoryActions._updatingStory && experiment.data.length >= (1 + block_num) * block_size) {
        $.ajax({
          type: 'GET',
          url: '/writing_task/' + wid + '/stats?block_num=' + block_num + '&block_size=' + block_size,
          dataType: 'json',
          success: setStats,
          error: function (a, b, c) {
            console.log(a, b, c);
          }
        });
      } else {

        setTimeout(StoryStatsActions.load_block_stats.bind(null, wid, block_num, block_size), 100);
      }
    }
  };
})();
