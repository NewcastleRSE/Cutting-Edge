'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var artefactCtrlStub = {
    index: 'artefactCtrl.index',
    show: 'artefactCtrl.show',
    create: 'artefactCtrl.create',
    upsert: 'artefactCtrl.upsert',
    patch: 'artefactCtrl.patch',
    destroy: 'artefactCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var artefactIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './artefact.controller': artefactCtrlStub
});

describe('Artefact API Router:', function() {
    it('should return an express router instance', function() {
        artefactIndex.should.equal(routerStub);
    });

    describe('GET /api/artefacts', function() {
        it('should route to artefact.controller.index', function() {
            routerStub.get
                .withArgs('/', 'artefactCtrl.index')
                .should.have.been.calledOnce;
        });
    });

    describe('GET /api/artefacts/:id', function() {
        it('should route to artefact.controller.show', function() {
            routerStub.get
                .withArgs('/:id', 'artefactCtrl.show')
                .should.have.been.calledOnce;
        });
    });

    describe('POST /api/artefacts', function() {
        it('should route to artefact.controller.create', function() {
            routerStub.post
                .withArgs('/', 'artefactCtrl.create')
                .should.have.been.calledOnce;
        });
    });

    describe('PUT /api/artefacts/:id', function() {
        it('should route to artefact.controller.upsert', function() {
            routerStub.put
                .withArgs('/:id', 'artefactCtrl.upsert')
                .should.have.been.calledOnce;
        });
    });

    describe('PATCH /api/artefacts/:id', function() {
        it('should route to artefact.controller.patch', function() {
            routerStub.patch
                .withArgs('/:id', 'artefactCtrl.patch')
                .should.have.been.calledOnce;
        });
    });

    describe('DELETE /api/artefacts/:id', function() {
        it('should route to artefact.controller.destroy', function() {
            routerStub.delete
                .withArgs('/:id', 'artefactCtrl.destroy')
                .should.have.been.calledOnce;
        });
    });
});
