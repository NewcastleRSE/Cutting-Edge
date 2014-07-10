'use strict';

var mongoose = require('mongoose'),
    Period = mongoose.model('Period');

/**
 * Find by ID
 */
exports.period = function(req, res, next, id) {
    Period.findOne({
        'id': id
    })
    .exec(function (err, period) {
        if (err) {
            return next(err);
        }

        if (!period) {
            return next(new Error('Failed to load Period ' + id));
        }

        req.period = period;
        next();
    });
};

/**
 * Show individual
 */
exports.show = function(req, res) {
    res.jsonp(req.period);
};

/**
 * List all
 */
exports.all = function(req, res) {
    Period.find().sort('id').exec(function(err, periods) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(periods);
        }
    });
};