/* jslint node: true */
"use strict";

var config = require('./config');
var stats_middleware = require('./middleware/stats');
var writingstats = require('./public/scripts/lib/stats').writing;

module.exports.experiment_name = function (req, res, next) {
  req.experiment_name = 'writing_task';
  next();
};

module.exports.hook_worker_registration = function (req, res, next) {
  req.experiment.feedback_type = config.feedback_type;
  next();
};

module.exports.generate_stats = function (req, res, next) {
  req.block_size = req.query.block_size || 3;
  req.block_num = req.query.block_num || 0;

  req.stats = {
    worker_last: writingstats.generatePopulationAverageStats([req.worker], req.block_num, req.block_size)
  };
  switch (req.experiment.feedback_type) {
    case config.constants.NONE:                  next();                                        break;
    case config.constants.REAL:                  stats_middleware.real(req, res, next);         break;
    case config.constants.FAKE_WORKER_IS_BETTER: stats_middleware.fake_better(req, res, next);  break;
    case config.constants.FAKE_WORKER_IS_WORSE:  stats_middleware.fake_worse(req, res, next);   break;
  }
};


exports.returnStats = function (req, res) {
  res.json(req.stats);
};

