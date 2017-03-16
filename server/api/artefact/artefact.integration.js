'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newArtefact;

describe('Artefact API:', function() {
    describe('GET /api/artefacts', function() {
        var artefacts;

        beforeEach(function(done) {
            request(app)
                .get('/api/artefacts')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    artefacts = res.body;
                    done();
                });
        });

        it('should respond with JSON array', function() {
            artefacts.should.be.instanceOf(Array);
        });
    });

    describe('POST /api/artefacts', function() {
        beforeEach(function(done) {
            request(app)
                .post('/api/artefacts')
                .send({
                    name: 'New Artefact',
                    info: 'This is the brand new artefact!!!'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    newArtefact = res.body;
                    done();
                });
        });

        it('should respond with the newly created artefact', function() {
            newArtefact.name.should.equal('New Artefact');
            newArtefact.info.should.equal('This is the brand new artefact!!!');
        });
    });

    describe('GET /api/artefacts/:id', function() {
        var artefact;

        beforeEach(function(done) {
            request(app)
                .get(`/api/artefacts/${newArtefact._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    artefact = res.body;
                    done();
                });
        });

        afterEach(function() {
            artefact = {};
        });

        it('should respond with the requested artefact', function() {
            artefact.name.should.equal('New Artefact');
            artefact.info.should.equal('This is the brand new artefact!!!');
        });
    });

    describe('PUT /api/artefacts/:id', function() {
        var updatedArtefact;

        beforeEach(function(done) {
            request(app)
                .put(`/api/artefacts/${newArtefact._id}`)
                .send({
                    name: 'Updated Artefact',
                    info: 'This is the updated artefact!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    updatedArtefact = res.body;
                    done();
                });
        });

        afterEach(function() {
            updatedArtefact = {};
        });

        it('should respond with the updated artefact', function() {
            updatedArtefact.name.should.equal('Updated Artefact');
            updatedArtefact.info.should.equal('This is the updated artefact!!!');
        });

        it('should respond with the updated artefact on a subsequent GET', function(done) {
            request(app)
                .get(`/api/artefacts/${newArtefact._id}`)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if(err) {
                        return done(err);
                    }
                    let artefact = res.body;

                    artefact.name.should.equal('Updated Artefact');
                    artefact.info.should.equal('This is the updated artefact!!!');

                    done();
                });
        });
    });

    describe('PATCH /api/artefacts/:id', function() {
        var patchedArtefact;

        beforeEach(function(done) {
            request(app)
                .patch(`/api/artefacts/${newArtefact._id}`)
                .send([
                    { op: 'replace', path: '/name', value: 'Patched Artefact' },
                    { op: 'replace', path: '/info', value: 'This is the patched artefact!!!' }
                ])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) {
                        return done(err);
                    }
                    patchedArtefact = res.body;
                    done();
                });
        });

        afterEach(function() {
            patchedArtefact = {};
        });

        it('should respond with the patched artefact', function() {
            patchedArtefact.name.should.equal('Patched Artefact');
            patchedArtefact.info.should.equal('This is the patched artefact!!!');
        });
    });

    describe('DELETE /api/artefacts/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            request(app)
                .delete(`/api/artefacts/${newArtefact._id}`)
                .expect(204)
                .end(err => {
                    if(err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404 when artefact does not exist', function(done) {
            request(app)
                .delete(`/api/artefacts/${newArtefact._id}`)
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
