'use strict';

//Megalithic service used for domesday REST endpoint
angular.module('mean.megalithic').factory('Megalithic', ['$log', '$q', '$http', function($log, $q, $http) {
    return {
        placesNear: function(latitude, longitude, radius) {
            var deferred = $q.defer();
            var url = '/rest/v1/megalithic?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius;

            $http.jsonp(url + '&callback=JSON_CALLBACK', {timeout:30000}).success(function(data) {
                deferred.resolve(data);
            }).
            error(function(status) {
                $log.error(status);
            });

            return deferred.promise;
        }
    };
}]);