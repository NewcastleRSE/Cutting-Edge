'use strict';

//Categories service used for categories REST endpoint
angular.module('mean.categories').factory('Categories', ['$resource', function($resource) {
    return $resource('rest/v1/categories/:categoryId/', {
        categoryId: '@_id'
    });
}]);