'use strict';

angular.module('mean.ui', ['ui.bootstrap']);

angular.module('mean.materials').controller('MaterialsController', ['$scope', '$modalInstance', 'Global', 'Materials', function ($scope, $modalInstance, Global, Materials) {
    $scope.materials = Materials.query();

    $scope.global = Global;

    $scope.ok = function () {
        $modalInstance.close($scope.global.selectedMaterials);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);