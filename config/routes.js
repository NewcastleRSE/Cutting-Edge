'use strict';

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the windowslive oauth routes
    app.get('/auth/windowslive', passport.authenticate('windowslive', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/windowslive/callback', passport.authenticate('windowslive', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);


    // Artefact Routes
    var artefacts = require('../app/controllers/artefacts');
    app.get('/rest/v1/artefacts', artefacts.all);
    app.get('/rest/v1/artefacts/:artefactId', artefacts.show);

    // artefactId param
    app.param('artefactId', artefacts.artefact);


    // Category Routes
    var categories = require('../app/controllers/categories');
    app.get('/rest/v1/categories', categories.all);
    app.get('/rest/v1/categories/:categoryId', categories.show);

    // categoryId param
    app.param('categoryId', categories.category);


    // Location Routes
    var locations = require('../app/controllers/locations');
    app.get('/rest/v1/locations', locations.all);
    app.get('/rest/v1/locations/:locationId', locations.show);

    // locationId param
    app.param('locationId', locations.location);


    // Material Routes
    var materials = require('../app/controllers/materials');
    app.get('/rest/v1/materials', materials.all);
    app.get('/rest/v1/materials/:materialId', materials.show);

    // materialId param
    app.param('materialId', materials.material);


    // Period Routes
    var periods = require('../app/controllers/periods');
    app.get('/rest/v1/periods', periods.all);
    app.get('/rest/v1/periods/:periodId', periods.show);

    // periodId param
    app.param('periodId', periods.period);


    // Megalithic Routes
    var megalithic = require('../app/controllers/megalithic');
    app.get('/rest/v1/megalithic', megalithic.all);
    app.get('/rest/v1/megalithic/:megalithicId', megalithic.show);

    // megalithicId param
    app.param('megalithicId', megalithic.megalithic);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
