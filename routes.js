'use strict';

/**
 * Adds new routes to the application passed in.
 * @param app
 */
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {});
    });

};


