/* jslint node: true */
var constants = {
  NONE: 'None',
  REAL: 'Real',
  FAKE_WORKER_IS_BETTER: 'Fake (Better)',
  FAKE_WORKER_IS_WORSE: 'Fake (Worse)'
};

var config = {
  feedback_type: constants.REAL,
  stats_query: {
    //"experiments.writing_task.feedback_type": constants.NONE,
    "experiments.writing_task": { $exists: true },
    "experiments.writing_task.completed": {$in: [true, "true", "True", "TRUE"]},
    "experiments.writing_task.data": { $exists: true, $not: { $size: 0 } }
  },
  fake_stats_modifiers: {
    better: { avg: 1.25, elite: 1.10 },
    worse:  { avg: 0.90, elite: 0.75 }
  },
  constants: constants
};


module.exports = config;
