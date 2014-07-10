'use strict';

angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.route', 'mean.artefacts', 'mean.categories', 'mean.domesday', 'mean.googleMap', 'mean.materials', 'mean.megalithic', 'mean.periods', 'mean.system', 'mean.timeline']);

angular.module('mean.artefacts', []);
angular.module('mean.categories', []);
angular.module('mean.domesday', []);
angular.module('mean.googleMap', ['google-maps', 'uiSlider']);
angular.module('mean.materials', []);
angular.module('mean.megalithic', []);
angular.module('mean.periods', []);
angular.module('mean.system', []);
angular.module('mean.timeline', []);