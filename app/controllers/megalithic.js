'use strict';

var validator = require('validator'),
    mongoose = require('mongoose'),
    Megalithic = mongoose.model('Megalithic');

/**
 * Find by ID
 */
exports.megalithic = function(req, res, next, id) {
    Megalithic.findOne({
        'id': id
    })
    .exec(function (err, megalithic) {
        if (err) {
            return next(err);
        }

        if (!megalithic) {
            return next(new Error('Failed to load Megalithic ' + id));
        }

        req.megalithic = megalithic;
        next();
    });
};

/**
 * Show individual
 */
exports.show = function(req, res) {
    res.jsonp(req.megalithic);
};

/**
 * List all
 */
exports.all = function(req, res) {
    var query = {};

    // location based query
    if (req.query.longitude && req.query.latitude && req.query.radius)
    {
        if (validator.isFloat(req.query.longitude) && validator.isFloat(req.query.latitude) && validator.isInt(req.query.radius)) {
            query.location =  {
                $near : {
                    $geometry : {
                        type : 'Point',
                        coordinates : [ req.query.longitude, req.query.latitude ]
                    }
                },
                $maxDistance : req.query.radius
            };
        }
    }

    // return 100 by default
    var limit = 100;

    if (req.query.count) {
        if (validator.isInt(req.query.count)) {
            // no more than 1000 at a time
            limit = req.query.count >= 1000 ? 1000 : req.query.count;
        }
    }

    // start on first page by default
    var skip = 0;

    if (req.query.page) {
        if (validator.isInt(req.query.page) && req.query.page > 1) {
            skip = (req.query.page - 1) * limit;
        }
    }

    Megalithic.find(query).sort('id').limit(limit).skip(skip).exec(function(err, results) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(results);
        }
    });
};