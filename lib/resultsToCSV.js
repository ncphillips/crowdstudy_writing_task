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
      ['id', 'platform', 'image', 'time', 'words', 'text',].join(', ')
    ];
    workers.forEach(function (worker) {
      worker.experiments.writing_task.data.forEach(function (image) {
        var row = [];
        row.push(worker.id);
        row.push(worker.platform);
        row.push(image.iid);
        row.push(image.edits[0].time_end - image.edits[0].time_start);
        var words = 0;
        image.text.split(' ').forEach(function (word, i) {
          if (word) {
            words++;
          }
        });
        row.push(words);
        row.push(image.text);
        spreadsheet.push(row.join(', '));
      });

    });
    return spreadsheet;
  }

  function stringSpreadsheet() {
    return wamsheet().join('\n');
  }

  return stringSpreadsheet;
})();

print(resultsToCSV());

