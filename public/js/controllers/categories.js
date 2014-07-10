'use strict';

angular.module('mean.ui', ['ui.bootstrap']);

angular.module('mean.categories').controller('CategoriesController', ['$scope', '$modalInstance', 'Global', 'Categories', function ($scope, $modalInstance, Global, Categories) {
    $scope.categories = Categories.query();

    $scope.global = Global;

    $scope.ok = function () {

        $modalInstance.close($scope.global.selectedCategories);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);