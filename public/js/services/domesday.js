'use strict';

//Domesday service used for domesday REST endpoint
angular.module('mean.domesday').factory('Domesday', ['$log', '$q', '$http', function($log, $q, $http) {
    return {
        placesNear: function(latitude, longitude, radius) {
            var deferred = $q.defer();
            var url = 'http://domesdaymap.co.uk/api/1.0/placesnear?lat=' + latitude + '&lng=' + longitude + '&radius=' + radius;

            $http.jsonp(url + '&callback=JSON_CALLBACK', {timeout:30000}).success(function(data) {
                deferred.resolve(data);
            }).
            error(function(status) {
                $log.error(status);
            });

            return deferred.promise;
        },
        manor: function(manor) {
            var deferred = $q.defer();
            var url = 'http://domesdaymap.co.uk/api/1.0/manor/' + manor;

            $http.jsonp(url, {timeout:30000}).success(function(data) {
                deferred.resolve(data);

                $log.info('Resolving Promise');
            }).
                error(function(data, status, headers, config) {
                    $log.error(data);
                    $log.error(status);
                    $log.error(headers);
                    $log.error(config);
                });

            return deferred.promise;
        }
    };
}]);