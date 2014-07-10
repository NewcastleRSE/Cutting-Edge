'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

/**
 * Find by ID
 */
exports.category = function(req, res, next, id) {
    Category.findOne({
        'id': id
    })
    .exec(function (err, category) {
        if (err) {
            return next(err);
        }

        if (!category) {
            return next(new Error('Failed to load Category ' + id));
        }

        req.category = category;
        next();
    });
};

/**
 * Show individual
 */
exports.show = function(req, res) {
    res.jsonp(req.category);
};

/**
 * List all
 */
exports.all = function(req, res) {
    Category.find().sort('id').exec(function(err, categories) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(categories);
        }
    });
};