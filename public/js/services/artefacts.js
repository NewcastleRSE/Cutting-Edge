'use strict';

//Artefacts service used for artefacts REST endpoint
angular.module('mean.artefacts').factory('Artefacts', ['$resource', function($resource) {
    return $resource('rest/v1/artefacts/:artefactId/', {
        artefactId: '@_id'
    });
}]);