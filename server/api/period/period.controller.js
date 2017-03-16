/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/periods              ->  index
 * POST    /api/periods              ->  create
 * GET     /api/periods/:id          ->  show
 * PUT     /api/periods/:id          ->  upsert
 * PATCH   /api/periods/:id          ->  patch
 * DELETE  /api/periods/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Period from './period.model';

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

// Gets a list of Periods
export function index(req, res) {
  return Period.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Period from the DB
export function show(req, res) {
  return Period.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Period in the DB
export function create(req, res) {
  return Period.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Period in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Period.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Period in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Period.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Period from the DB
export function destroy(req, res) {
  return Period.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
