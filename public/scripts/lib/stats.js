var stats= (function () {
  "use strict";

  /**
   * This function aggregates a homogenous array of stats objects
   * by finding the mean value for each stats value.
   *
   * Each stats object must be a non-nested object with a Number value (int or float).
   *
   *
   * @param stats
   */
  function aggregateStats(stats) {
    var result = {};

    stats.forEach(function (stat) {
      for (var name in stat) {
        if (stat.hasOwnProperty(name)) {
          if (!result.hasOwnProperty(name)){
            result[name] = 0;
          }
          result[name] += parseFloat(stat[name]) || 0;
        }
      }
    });

    for (var name in result) {
      if (result.hasOwnProperty(name)) {
        result[name] = result[name] / stats.length;
      }
    }
    return result;
  }

  /**
   * Sorts stats objects using Quick sort.
   *
   * @param stats
   * @param property_name
   * @param reverse
   * @returns {*}
   */
  function sortStats(stats, property_name, reverse) {
    if (typeof reverse === 'undefined') {
      reverse = false;
    }
    // Order these by the property_name;
    if (stats.length <= 1) {
      return stats;
    }

    var pivot = Math.floor((stats.length - 1) / 2);
    var val = stats[pivot];

    var less = [];
    var more = [];

    var stat;
    for (var i=0; i < pivot; i++) {
      stat = stats[i];
      if (reverse) {
        stat[property_name] < val[property_name] ? less.push(stat): more.push(stat);
      } else {
        stat[property_name] > val[property_name] ? less.push(stat): more.push(stat);
      }
    }

    for (i=pivot+1; i < stats.length; i++) {
      stat = stats[i];
      if (reverse) {
        stat[property_name] < val[property_name] ? less.push(stat): more.push(stat);
      } else {
        stat[property_name] > val[property_name] ? less.push(stat): more.push(stat);
      }
    }

    return (sortStats(less, property_name, reverse)).concat([val], sortStats(more, property_name, reverse));
  }

  return {
    aggregateStats: aggregateStats,
    sortStats: sortStats
  };

})();

var writingstats = (function () {
  "use strict";

  /**
   * Generates a stats object for a single Whack a Mole block.
   *
   * @param block
   * @returns {{time: number, time_per_mole: number, num_misses: number, misses_per_mole: number, num_hits: number, score: number}}
   */
  function generateBlockStats(block) {
    var stats = {
      time: 0,
      words: 0
    };

    block.text.split(' ').forEach(function (word, i) {
      if (word) {
        console.log(i, word);
        stats.words++;
      }
    });

    block.edits.forEach(function (edit) {
      stats.time += (edit.time_end - edit.time_start);
    });

    stats.rank = (stats.words * 1000) / stats.time;
    return stats;
  }


  /**
   * Generates a single stats object, given an array of blocks.
   *
   * @param blocks
   * @returns {*}
   */
  function generateAverageBlockStats(blocks) {
    // Generate the stats object for every block.
    var block_stats = blocks.map(generateBlockStats);

    // Aggregate all block stats objects and return the result;
    return stats.aggregateStats(block_stats);
  }

  function generatePopulationEliteStats(workers, block_num, block_size) {
    // Get the aggregated stats object for  a worker.
    var n = Math.ceil(workers.length * 0.15) || 1;
    var worker_average_stats = workers.map(function (worker) {
      var blocks = [];
      var iid;
      for (var i=0; i< block_size; i++) {
        iid = (block_num * block_size) + i;
        blocks.push(writingstats.generateBlockStats(worker.experiments.writing_task.data[iid]));
      }
      return stats.aggregateStats(blocks);
    });
    var elite_workers = stats.sortStats(worker_average_stats, 'rank');
    var elite_worker_stats = elite_workers.splice(0, n);
    return stats.aggregateStats(elite_worker_stats);
  }

  function generatePopulationAverageStats(workers, block_num, block_size) {
    var worker_average_stats = workers.map(function (worker) {
      var blocks = [];
      var iid;
      for (var i=0; i< block_size; i++) {
        iid = (block_num * block_size) + i;
        blocks.push(writingstats.generateBlockStats(worker.experiments.writing_task.data[iid]));
      }
      return stats.aggregateStats(blocks);
    });

    return stats.aggregateStats(worker_average_stats);
  }

  return {
    generateBlockStats: generateBlockStats,
    generateAverageStats: generateAverageBlockStats,
    generatePopulationAverageStats: generatePopulationAverageStats,
    generatePopulationEliteStats: generatePopulationEliteStats
  };
})();

if (typeof module !== 'undefined') {
  module.exports.writing = writingstats;
  module.exports.stats = stats;
}
