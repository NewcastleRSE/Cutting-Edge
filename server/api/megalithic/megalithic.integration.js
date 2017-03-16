'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMegalithic;

describe('Megalithic API:', function() {
    describe('GET /api/megalithic', function() {
        var megalithics;

        beforeEach(function(done) {
            request(app)
                .get('/api/megalithic')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    megalithics = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            megalithics.should.be.instanceOf(Array);
        });
    });

    describe('POST /api/megalithic', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/megalithic')
                .send({
                    name: 'New Megalithic',
                    info: 'This is the brand new megalithic!!!'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    newMegalithic = res.body;
                    done();
                });
        });

        it('should respond with the newly created megalithic', function() {
            newMegalithic.name.should.equal('New Megalithic');
            newMegalithic.info.should.equal('This is the brand new megalithic!!!');
        });
    });

    describe('GET /api/megalithic/:id', function() {
        var megalithic;

        beforeEach(function(done) {
            request(app)
                .get(`/api/megalithic/${newMegalithic._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    megalithic = res.body;
                    done();
                });
        });

        afterEach(function() {
            megalithic = {};
        });

        it('should respond with the requested megalithic', function() {
            megalithic.name.should.equal('New Megalithic');
            megalithic.info.should.equal('This is the brand new megalithic!!!');
        });
    });

    describe('PUT /api/megalithic/:id', function() {
        var updatedMegalithic;

        beforeEach(function(done) {
            request(app)
                .put(`/api/megalithic/${newMegalithic._id}`)
                .send({
                    name: 'Updated Megalithic',
                    info: 'This is the updated megalithic!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    updatedMegalithic = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedMegalithic = {};
        });

        it('should respond with the updated megalithic', function() {
            updatedMegalithic.name.should.equal('Updated Megalithic');
            updatedMegalithic.info.should.equal('This is the updated megalithic!!!');
        });

        it('should respond with the updated megalithic on a subsequent GET', function(done) {
            request(app)
                .get(`/api/megalithic/${newMegalithic._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    let megalithic = res.body;

                    megalithic.name.should.equal('Updated Megalithic');
                    megalithic.info.should.equal('This is the updated megalithic!!!');

                    done();
                });
        });
    });

    describe('PATCH /api/megalithic/:id', function() {
        var patchedMegalithic;

        beforeEach(function(done) {
            request(app)
                .patch(`/api/megalithic/${newMegalithic._id}`)
                .send([
                    { op: 'replace', path: '/name', value: 'Patched Megalithic' },
                    { op: 'replace', path: '/info', value: 'This is the patched megalithic!!!' }
                ])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    patchedMegalithic = res.body;
                    done();
                });
        });

        afterEach(function() {
            patchedMegalithic = {};
        });

        it('should respond with the patched megalithic', function() {
            patchedMegalithic.name.should.equal('Patched Megalithic');
            patchedMegalithic.info.should.equal('This is the patched megalithic!!!');
        });
    });

    describe('DELETE /api/megalithic/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/megalithic/${newMegalithic._id}`)
                .expect(204)
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when megalithic does not exist', function(done) {
            request(app)
                .delete(`/api/megalithic/${newMegalithic._id}`)
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
