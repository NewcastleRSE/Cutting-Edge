/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/artefacts              ->  index
 * POST    /api/artefacts              ->  create
 * GET     /api/artefacts/:id          ->  show
 * PUT     /api/artefacts/:id          ->  upsert
 * PATCH   /api/artefacts/:id          ->  patch
 * DELETE  /api/artefacts/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import validator from 'validator';
import Artefact from './artefact.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if(entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch(err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if(entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if(!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Artefacts
export function index(req, res) {
    let query = {};
    let limit = 100;
    
    // location based query
    if(req.query.longitude && req.query.latitude && req.query.radius) {
        if(validator.isFloat(req.query.longitude) && validator.isFloat(req.query.latitude) && validator.isInt(req.query.radius)) {
            query['findLocation.location'] = {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
                    },
                    $maxDistance: parseInt(req.query.radius)
                }
            };
        }
    }
    if(req.query.category) {
        req.query.category = [].concat(req.query.category);

        query['category.id'] = { $in: req.query.category };
    }
    if(req.query.material) {
        req.query.material = [].concat(req.query.material);

        query['materials.id'] = { $in: req.query.material };
    }
    if(req.query.period) {
        req.query.period = [].concat(req.query.period);

        query['periods.id'] = { $in: req.query.period };
    }
    if(req.query.location) {
        req.query.location = [].concat(req.query.location);

        query['currentLocation.id'] = { $in: req.query.location };
    }
    if(req.query.hasReferences) {
        if(validator.toBoolean(req.query.hasReferences, true)) {
            query.references = { $not: { $size: 0 } };
        } else {
            query.references = { $size: 0 };
        }
    }
    if(req.query.hasDescription) {
        if(validator.toBoolean(req.query.hasDescription, true)) {
            query.description = { $nin: ['', null] };
        } else {
            query.description = { $in: ['', null] };
        }
    }
    if(req.query.hasCaseStudy) {
        query.caseStudy = { $exists: validator.toBoolean(req.query.hasCaseStudy, true) };
    }
    if(req.query.text) {
        req.query.text = validator.escape(req.query.text);

        query.$or = [
            { accession: { $regex: req.query.text, $options: 'ims' } },
            { simpleName: { $regex: req.query.text, $options: 'ims' } },
            { description: { $regex: req.query.text, $options: 'ims' } }
        ];
    }
    // return 100 by default
    if(req.query.all) {
        limit = Number.MAX_SAFE_INTEGER;
    }

    if(req.query.count) {
        if(validator.isInt(req.query.count)) {
            // no more than 1000 at a time
            limit = parseInt(req.query.count, 10) >= 1000 ? 1000 : parseInt(req.query.count, 10);
        }
    }

    // start on first page by default
    let skip = 0;

    if(req.query.page) {
        if(validator.isInt(req.query.page) && req.query.page > 1) {
            skip = (req.query.page - 1) * limit;
        }
    }

    return Artefact.find(query)
        .limit(limit)
        .skip(skip)
        .exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Artefact from the DB
export function show(req, res) {
    return Artefact.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a random Artefact from the DB
export function random(req, res) {
    return Artefact.aggregate([{$sample: {size: 1}}]).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Artefact in the DB
export function create(req, res) {
    return Artefact.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Artefact in the DB at the specified ID
export function upsert(req, res) {
    if(req.body._id) {
        delete req.body._id;
    }
    return Artefact.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Artefact in the DB
export function patch(req, res) {
    if(req.body._id) {
        delete req.body._id;
    }
    return Artefact.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Artefact from the DB
export function destroy(req, res) {
    return Artefact.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}
