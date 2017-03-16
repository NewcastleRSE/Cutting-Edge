'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var periodCtrlStub = {
    index: 'periodCtrl.index',
    show: 'periodCtrl.show',
    create: 'periodCtrl.create',
    upsert: 'periodCtrl.upsert',
    patch: 'periodCtrl.patch',
    destroy: 'periodCtrl.destroy'
};

var routerStub = {
    get: sinon.spy(),
    put: sinon.spy(),
    patch: sinon.spy(),
    post: sinon.spy(),
    delete: sinon.spy()
};

// require the index with our stubbed out modules
var periodIndex = proxyquire('./index.js', {
    express: {
        Router() {
            return routerStub;
        }
    },
    './period.controller': periodCtrlStub
});

describe('Period API Router:', function() {
    it('should return an express router instance', function() {
        periodIndex.should.equal(routerStub);
    });

    describe('GET /api/periods', function() {
        it('should route to period.controller.index', function() {
            routerStub.get
                .withArgs('/', 'periodCtrl.index')
                .should.have.been.calledOnce;
        });
    });

    describe('GET /api/periods/:id', function() {
        it('should route to period.controller.show', function() {
            routerStub.get
                .withArgs('/:id', 'periodCtrl.show')
                .should.have.been.calledOnce;
        });
    });

    describe('POST /api/periods', function() {
        it('should route to period.controller.create', function() {
            routerStub.post
                .withArgs('/', 'periodCtrl.create')
                .should.have.been.calledOnce;
        });
    });

    describe('PUT /api/periods/:id', function() {
        it('should route to period.controller.upsert', function() {
            routerStub.put
                .withArgs('/:id', 'periodCtrl.upsert')
                .should.have.been.calledOnce;
        });
    });

    describe('PATCH /api/periods/:id', function() {
        it('should route to period.controller.patch', function() {
            routerStub.patch
                .withArgs('/:id', 'periodCtrl.patch')
                .should.have.been.calledOnce;
        });
    });

    describe('DELETE /api/periods/:id', function() {
        it('should route to period.controller.destroy', function() {
            routerStub.delete
                .withArgs('/:id', 'periodCtrl.destroy')
                .should.have.been.calledOnce;
        });
    });
});
