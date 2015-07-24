/* jslint node: true */
'use strict';
var config = {
  /**
   * We want to be able to turn on/off different types of feedback.
   * None and real are all good.
   * How do we
   */
  feedback: {
    types: ['none', 'real'],
    fake_types: []
  },
  population_query: {"experiments.writing_task.completed": {$in: [true, "true"]}}
};

config.NONE= 'none';
config.REAL = 'real';
config.FAKE = 'fake';

module.exports = config;
