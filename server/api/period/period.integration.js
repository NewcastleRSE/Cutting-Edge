'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPeriod;

describe('Period API:', function() {
    describe('GET /api/periods', function() {
        var periods;

        beforeEach(function(done) {
            request(app)
                .get('/api/periods')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    periods = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            periods.should.be.instanceOf(Array);
        });
    });

    describe('POST /api/periods', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/periods')
                .send({
                    name: 'New Period',
                    info: 'This is the brand new period!!!'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    newPeriod = res.body;
                    done();
                });
        });

        it('should respond with the newly created period', function() {
            newPeriod.name.should.equal('New Period');
            newPeriod.info.should.equal('This is the brand new period!!!');
        });
    });

    describe('GET /api/periods/:id', function() {
        var period;

        beforeEach(function(done) {
            request(app)
                .get(`/api/periods/${newPeriod._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    period = res.body;
                    done();
                });
        });

        afterEach(function() {
            period = {};
        });

        it('should respond with the requested period', function() {
            period.name.should.equal('New Period');
            period.info.should.equal('This is the brand new period!!!');
        });
    });

    describe('PUT /api/periods/:id', function() {
        var updatedPeriod;

        beforeEach(function(done) {
            request(app)
                .put(`/api/periods/${newPeriod._id}`)
                .send({
                    name: 'Updated Period',
                    info: 'This is the updated period!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    updatedPeriod = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedPeriod = {};
        });

        it('should respond with the updated period', function() {
            updatedPeriod.name.should.equal('Updated Period');
            updatedPeriod.info.should.equal('This is the updated period!!!');
        });

        it('should respond with the updated period on a subsequent GET', function(done) {
            request(app)
                .get(`/api/periods/${newPeriod._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    let period = res.body;

                    period.name.should.equal('Updated Period');
                    period.info.should.equal('This is the updated period!!!');

                    done();
                });
        });
    });

    describe('PATCH /api/periods/:id', function() {
        var patchedPeriod;

        beforeEach(function(done) {
            request(app)
                .patch(`/api/periods/${newPeriod._id}`)
                .send([
                    { op: 'replace', path: '/name', value: 'Patched Period' },
                    { op: 'replace', path: '/info', value: 'This is the patched period!!!' }
                ])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    patchedPeriod = res.body;
                    done();
                });
        });

        afterEach(function() {
            patchedPeriod = {};
        });

        it('should respond with the patched period', function() {
            patchedPeriod.name.should.equal('Patched Period');
            patchedPeriod.info.should.equal('This is the patched period!!!');
        });
    });

    describe('DELETE /api/periods/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/periods/${newPeriod._id}`)
                .expect(204)
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when period does not exist', function(done) {
            request(app)
                .delete(`/api/periods/${newPeriod._id}`)
                .expect(404)
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });
    });
});
