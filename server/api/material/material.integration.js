'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newMaterial;

describe('Material API:', function() {
  describe('GET /api/materials', function() {
    var materials;

    beforeEach(function(done) {
      request(app)
        .get('/api/materials')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          materials = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      materials.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/materials', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/materials')
        .send({
          name: 'New Material',
          info: 'This is the brand new material!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMaterial = res.body;
          done();
        });
    });

    it('should respond with the newly created material', function() {
      newMaterial.name.should.equal('New Material');
      newMaterial.info.should.equal('This is the brand new material!!!');
    });
  });

  describe('GET /api/materials/:id', function() {
    var material;

    beforeEach(function(done) {
      request(app)
        .get(`/api/materials/${newMaterial._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          material = res.body;
          done();
        });
    });

    afterEach(function() {
      material = {};
    });

    it('should respond with the requested material', function() {
      material.name.should.equal('New Material');
      material.info.should.equal('This is the brand new material!!!');
    });
  });

  describe('PUT /api/materials/:id', function() {
    var updatedMaterial;

    beforeEach(function(done) {
      request(app)
        .put(`/api/materials/${newMaterial._id}`)
        .send({
          name: 'Updated Material',
          info: 'This is the updated material!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMaterial = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMaterial = {};
    });

    it('should respond with the updated material', function() {
      updatedMaterial.name.should.equal('Updated Material');
      updatedMaterial.info.should.equal('This is the updated material!!!');
    });

    it('should respond with the updated material on a subsequent GET', function(done) {
      request(app)
        .get(`/api/materials/${newMaterial._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let material = res.body;

          material.name.should.equal('Updated Material');
          material.info.should.equal('This is the updated material!!!');

          done();
        });
    });
  });

  describe('PATCH /api/materials/:id', function() {
    var patchedMaterial;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/materials/${newMaterial._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Material' },
          { op: 'replace', path: '/info', value: 'This is the patched material!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMaterial = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMaterial = {};
    });

    it('should respond with the patched material', function() {
      patchedMaterial.name.should.equal('Patched Material');
      patchedMaterial.info.should.equal('This is the patched material!!!');
    });
  });

  describe('DELETE /api/materials/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/materials/${newMaterial._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when material does not exist', function(done) {
      request(app)
        .delete(`/api/materials/${newMaterial._id}`)
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
