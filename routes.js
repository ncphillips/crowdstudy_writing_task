/* jslint node: true */
'use strict';

var worker = require('crowdstudy_worker').controllers;
var controllers = require('./controllers');
/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index', {});
  });

  app.get('/stats',
    controllers.experiment_name,
    controllers.generate_stats,
    controllers.returnStats
  );
};


