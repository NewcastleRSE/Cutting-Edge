/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/periods', require('./api/period'));
  app.use('/api/megalithic', require('./api/megalithic'));
  app.use('/api/materials', require('./api/material'));
  app.use('/api/locations', require('./api/location'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/artefacts', require('./api/artefact'));
  app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
