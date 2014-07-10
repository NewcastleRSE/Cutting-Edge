'use strict';

var mongoose = require('mongoose'),
    Location = mongoose.model('Location');

/**
 * Find by ID
 */
exports.location = function(req, res, next, id) {
    Location.findOne({
        'id': id
    })
    .exec(function (err, location) {
        if (err) {
            return next(err);
        }

        if (!location) {
            return next(new Error('Failed to load Location ' + id));
        }

        req.location = location;
        next();
    });
};

/**
 * Show individual
 */
exports.show = function(req, res) {
    res.jsonp(req.location);
};

/**
 * List all
 */
exports.all = function(req, res) {
    Location.find().sort('id').exec(function(err, locations) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(locations);
        }
    });
};