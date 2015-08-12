/* jslint node: true */
"use strict";
var config = require('../config');
var stats = require('../public/scripts/lib/stats');

function fake(req, avg_mod, elite_mod) {
  req.stats.population_average = {};
  req.stats.population_elite = {};

  req.stats.population_average.time = req.stats.worker_last.time * avg_mod;
  req.stats.population_average.words = req.stats.worker_last.words / avg_mod;

  req.stats.population_elite.time = req.stats.worker_last.time * elite_mod;
  req.stats.population_elite.words = req.stats.worker_last.words / elite_mod;
}

module.exports = {
  real: function (req, res, next) {
    var workers = req.db.collection('workers');
    workers.find(config.stats_query).toArray(function (err, workers) {
      // Error
      if (err) {
        return next(err);
      }
      // No Workers
      else if (workers.length < 1) {
        req.stats.population_average = { time: 0, words: 0 };
        req.stats.population_elite = { time: 0, words: 0 };
        return next();
      }
      // Some Workers
      req.stats.population_average = stats.writing.generatePopulationAverageStats(workers, req.block_num, req.block_size);
      req.stats.population_elite = stats.writing.generatePopulationEliteStats(workers, req.block_num, req.block_size);
      next();
    });

  },
  fake_better: function (req, res, next) {
    var avg_mod = config.fake_stats_modifiers.better.avg;
    var elite_mod = config.fake_stats_modifiers.better.avg;
    fake(req, avg_mod, elite_mod);
    next();
  },
  fake_worse: function (req, res, next) {
    var avg_mod = config.fake_stats_modifiers.worse.avg;
    var elite_mod = config.fake_stats_modifiers.worse.avg;
    fake(req, avg_mod, elite_mod);
    next();

  }
};
