'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var materialCtrlStub = {
  index: 'materialCtrl.index',
  show: 'materialCtrl.show',
  create: 'materialCtrl.create',
  upsert: 'materialCtrl.upsert',
  patch: 'materialCtrl.patch',
  destroy: 'materialCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var materialIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './material.controller': materialCtrlStub
});

describe('Material API Router:', function() {
  it('should return an express router instance', function() {
    materialIndex.should.equal(routerStub);
  });

  describe('GET /api/materials', function() {
    it('should route to material.controller.index', function() {
      routerStub.get
        .withArgs('/', 'materialCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/materials/:id', function() {
    it('should route to material.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'materialCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/materials', function() {
    it('should route to material.controller.create', function() {
      routerStub.post
        .withArgs('/', 'materialCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/materials/:id', function() {
    it('should route to material.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'materialCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/materials/:id', function() {
    it('should route to material.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'materialCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/materials/:id', function() {
    it('should route to material.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'materialCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
