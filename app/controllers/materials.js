'use strict';

var mongoose = require('mongoose'),
    Material = mongoose.model('Material');

/**
 * Find by ID
 */
exports.material = function(req, res, next, id) {
    Material.findOne({
        'id': id
    })
    .exec(function (err, material) {
        if (err) {
            return next(err);
        }

        if (!material) {
            return next(new Error('Failed to load Material ' + id));
        }

        req.material = material;
        next();
    });
};

/**
 * Show individual
 */
exports.show = function(req, res) {
    res.jsonp(req.material);
};

/**
 * List all
 */
exports.all = function(req, res) {
    Material.find().sort('id').exec(function(err, materials) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(materials);
        }
    });
};