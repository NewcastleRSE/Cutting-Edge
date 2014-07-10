'use strict';

/**
 * Module dependencies.
 */
var validator = require('validator'),
    mongoose = require('mongoose'),
    Artefact = mongoose.model('Artefact');

/**
 * Find Artefact by id
 */
exports.artefact = function(req, res, next, id) {
    Artefact.findOne({
        'id': id
    })
    .exec(function (err, artefact) {
        if (err) {
            return next(err);
        }

        if (!artefact) {
            return next(new Error('Failed to load Artefact ' + id));
        }

        req.artefact = artefact;
        next();
    });
};

/**
 * Show an Artefact
 */
exports.show = function(req, res) {
    res.jsonp(req.artefact);
};

/**
 * List of Artefacts
 */
exports.all = function(req, res) {
    var query = {};

    // location based query
    if (req.query.longitude && req.query.latitude && req.query.radius) {
        if (validator.isFloat(req.query.longitude) && validator.isFloat(req.query.latitude) && validator.isInt(req.query.radius)) {
            query['findLocation.location'] =  {
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

    if (req.query.category) {
        req.query.category = [].concat( req.query.category );

        query['category.id'] = { $in: req.query.category };
    }

    if (req.query.material) {
        req.query.material = [].concat( req.query.material );

        query['materials.id'] = { $in: req.query.material };
    }

    if (req.query.period) {
        req.query.period = [].concat( req.query.period );

        query['periods.id'] = { $in: req.query.period };
    }

    if (req.query.location) {
        req.query.location = [].concat( req.query.location );

        query['currentLocation.id'] = { $in: req.query.location };
    }

    if (req.query.hasReferences) {
        if (validator.toBoolean(req.query.hasReferences, true)) {
            query.references = { $not: { $size: 0 } };
        } else {
            query.references = { $size: 0 };
        }
    }

    if (req.query.hasDescription) {
        if (validator.toBoolean(req.query.hasDescription, true)) {
            query.description = { $nin: [ '', null ] };
        } else {
            query.description = { $in: [ '', null ] };
        }
    }

    if (req.query.hasCaseStudy) {
        query.caseStudy = { $exists: validator.toBoolean(req.query.hasCaseStudy, true) };
    }

    if (req.query.text) {
        req.query.text = validator.escape(req.query.text);

        query.$or = [
            { accession: { $regex: req.query.text, $options: 'ims' } },
            { simpleName: { $regex: req.query.text, $options: 'ims' } },
            { description: { $regex: req.query.text, $options: 'ims' } }
        ];
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

    Artefact.find(query).limit(limit).skip(skip).exec(function(err, results) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(results);
        }
    });
};