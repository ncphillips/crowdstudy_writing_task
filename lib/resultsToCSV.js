var resultsToCSV = (function () {
  "use strict";

  var COMPLETED = {
    "experiments.writing_task.completed": {
      $in: ["true", true]
    },
    "experiments.writing_task.code": {$exists: true, $nin: [""]}
  };

  function findAllCompletedWork(callback) {
    return db.workers.find(COMPLETED).toArray();
  }


  function wamsheet(){
    var workers = findAllCompletedWork();
    var spreadsheet = [
    ];
    workers.forEach(function (worker) {
    });
    return spreadsheet;
  }

  function stringSpreadsheet() {
    return wamsheet().join('\r\n');
  }

  return stringSpreadsheet;
})();

print(resultsToCSV());

