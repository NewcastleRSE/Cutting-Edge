'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var megalithicCtrlStub = {
    index: 'megalithicCtrl.index',
    show: 'megalithicCtrl.show',
    create: 'megalithicCtrl.create',
    upsert: 'megalithicCtrl.upsert',
    patch: 'megalithicCtrl.patch',
    destroy: 'megalithicCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var megalithicIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './megalithic.controller': megalithicCtrlStub
});

describe('Megalithic API Router:', function() {
    it('should return an express router instance', function() {
        megalithicIndex.should.equal(routerStub);
    });

    describe('GET /api/megalithic', function() {
        it('should route to megalithic.controller.index', function() {
            routerStub.get
                .withArgs('/', 'megalithicCtrl.index')
                .should.have.been.calledOnce;
        });
    });

    describe('GET /api/megalithic/:id', function() {
        it('should route to megalithic.controller.show', function() {
            routerStub.get
                .withArgs('/:id', 'megalithicCtrl.show')
                .should.have.been.calledOnce;
        });
    });

    describe('POST /api/megalithic', function() {
        it('should route to megalithic.controller.create', function() {
            routerStub.post
                .withArgs('/', 'megalithicCtrl.create')
                .should.have.been.calledOnce;
        });
    });

    describe('PUT /api/megalithic/:id', function() {
        it('should route to megalithic.controller.upsert', function() {
            routerStub.put
                .withArgs('/:id', 'megalithicCtrl.upsert')
                .should.have.been.calledOnce;
        });
    });

    describe('PATCH /api/megalithic/:id', function() {
        it('should route to megalithic.controller.patch', function() {
            routerStub.patch
                .withArgs('/:id', 'megalithicCtrl.patch')
                .should.have.been.calledOnce;
        });
    });

    describe('DELETE /api/megalithic/:id', function() {
        it('should route to megalithic.controller.destroy', function() {
            routerStub.delete
                .withArgs('/:id', 'megalithicCtrl.destroy')
                .should.have.been.calledOnce;
        });
    });
});
