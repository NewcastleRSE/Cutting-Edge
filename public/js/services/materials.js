'use strict';

//Materials service used for materials REST endpoint
angular.module('mean.materials').factory('Materials', ['$resource', function($resource) {
    return $resource('rest/v1/materials/:materialId/', {
        materialsId: '@_id'
    });
}]);