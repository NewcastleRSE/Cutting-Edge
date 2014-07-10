'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$log', 'Global', 'Artefacts', function ($scope, $log, Global, Artefacts) {
    $scope.global = Global;

    $scope.casestudies = function() {
        Artefacts.query({
            hasCaseStudy:true
        },function(artefacts) {
            $scope.caseStudies = artefacts;
        });
    };
}]);