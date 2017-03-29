'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

/*function requiredProcessEnv(name) {
 if(!process.env[name]) {
 throw new Error('You must set the ' + name + ' environment variable');
 }
 return process.env[name];
 }*/

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(`${__dirname}/../../..`),

    // Browser-sync port
    browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

    // Server port
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    // Should we populate the DB with sample data?
    seedDB: false,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'cutting-edge-docker-secret'
    },

    raven: {
        url: 'sentry.di-projects.net',
        publicKey: '008741333a23451aae3436487236f09b',
        secretKey: 'd9e516d3d9ee43c69b6a3f19e268010f',
        project: '6'
    },

    // MongoDB connection options
    mongo: {
        options: {
            db: {
                safe: true
            }
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./shared'),
    require(`./${process.env.NODE_ENV}.js`) || {});
