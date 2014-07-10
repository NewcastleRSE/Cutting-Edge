'use strict';

//Periods service used for periods REST endpoint
angular.module('mean.periods').factory('Periods', ['$log', '$q', '$http', function($log, $q, $http) {
    /*return $resource('rest/v1/periods/:periodId/', {
        periodsId: '@_id'
    });*/

    return {
        getPeriods: function() {
            var deferred = $q.defer();
            var url = 'rest/v1/periods/';

            $http.get(url, {timeout:30000}).success(function(data) {
                deferred.resolve(data);
            }).error(function(status) {
                $log.error(status);
            });

            return deferred.promise;
        }
    };
}]);