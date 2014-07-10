'use strict';

angular.module('mean.ui', ['ui.bootstrap']);

angular.module('mean.periods').controller('PeriodsController', ['$scope', '$modalInstance', 'Global', 'Periods', function ($scope, $modalInstance, Global, Periods) {
    //$scope.periods = Periods.query();

    Periods.getPeriods().then(function(periods){
        $scope.periods = periods;
    });

    $scope.global = Global;

    $scope.ok = function () {
        $modalInstance.close($scope.global.selectedPeriods);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);