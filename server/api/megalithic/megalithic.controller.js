/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/megalithic              ->  index
 * POST    /api/megalithic              ->  create
 * GET     /api/megalithic/:id          ->  show
 * PUT     /api/megalithic/:id          ->  upsert
 * PATCH   /api/megalithic/:id          ->  patch
 * DELETE  /api/megalithic/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Megalithic from './megalithic.model';

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

// Gets a list of Megalithics
export function index(req, res) {
  return Megalithic.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Megalithic from the DB
export function show(req, res) {
  return Megalithic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Megalithic in the DB
export function create(req, res) {
  return Megalithic.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Megalithic in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Megalithic.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Megalithic in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Megalithic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Megalithic from the DB
export function destroy(req, res) {
  return Megalithic.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
