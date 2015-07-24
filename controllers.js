/* jslint node: true */
"use strict";

var config = require('./config');

module.exports.experiment_name = function (req, res, next) {
  req.experiment_name = 'writing_task';
  next();
};

module.exports.hook_worker_registration = function (req, res, next) {
  var workers = req.db.collection('workers');
  workers.find({"experiments.writing_task.completed": {$in: [true, 'true']}}, function (err, workers) {
    var feedback_type = config.NONE;
    var count = 0;
    if (err) {
      console.log(err);
    }
    else if (workers){
      count = workers.length;
      if (count > 10) {
        feedback_type = config.feedback.types[count % 2];
      }
      req.workers = workers;
    }
    req.experiment.feedback_type = feedback_type;
    next();
  });
};

module.exports.generate_stats = function (req, res, next) {
  req.stats = {};
  real_stats(req, res, next);
};



var real_stats = function (req, res, next) {
  var stats = require('./public/scripts/lib/stats');
  var workers = req.db.collection('workers');
  workers.find(config.population_query).toArray(function (err, workers) {
    if (err) {
      return next(err);
    } else if (workers.length < 1) {
      return next();
    }
    console.log(workers);
    req.stats = {
      population_average: stats.writing.generatePopulationAverageStats(workers),
      population_elite: stats.writing.generatePopulationEliteStats(workers)
    };
    next();
  });
};
exports.real_stats = real_stats;

var fake_stats = function (req, res, next) {
  real_stats(req, res, function () {
    var a = req.stats.population_average;
    var p = req.stats.population_elite;

    var modifier = 0.5;

    a.time = a.time * modifier;
    a.words = a.words / modifier;

    p.time = p.time * modifier;
    p.words = p.words / modifier;

    next();
  });

};
exports.fake_stats = fake_stats;

exports.returnStats = function (req, res) {
  res.json(req.stats);
};

