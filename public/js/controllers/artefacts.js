'use strict';

angular.module('mean.ui', ['ui.bootstrap', 'frapontillo.bootstrap-switch', 'mean.categories', 'mean.materials', 'mean.periods', 'infinite-scroll']);

angular.module('mean.artefacts').controller('ArtefactsController', ['$scope', '$window', '$modal', '$log', '$routeParams', '$location', 'Global', 'Utilities', 'Artefacts', function ($scope, $window, $modal, $log, $routeParams, $location, Global, Utilities, Artefacts) {

    if($window._.str.include($location.$$path,'map')){
        Global.map = true;
    } else {
        Global.map = false;
    }

    $scope.global = Global;
    $scope.utilities = Utilities;
    $scope.searching = true;
    $scope.page = 1;
    $scope.pageSize = 20;
    $scope.searchParameters = {
        page: $scope.page,
        count: $scope.pageSize
    };

    $scope.all = function() {
        Artefacts.query({
            count:$scope.pageSize
        },function(artefacts) {
            $scope.artefacts = artefacts;
        });
    };

    $scope.findOne = function() {

        if($routeParams.artefactId === 'random')
        {
            $routeParams.artefactId = Utilities.getRandomInt(1,1026);
        }

        Artefacts.get({
            artefactId: $routeParams.artefactId
        }, function(artefact) {
            $scope.artefact = artefact;
        });
    };

    $scope.all = function() {
        Artefacts.query({
            count:$scope.pageSize
        },function(artefacts) {
            $scope.artefacts = artefacts;
        });
    };

    $scope.casestudies = function() {
        Artefacts.query({
            hasCaseStudy:true
        },function(artefacts) {
            $scope.caseStudies = artefacts;
        });
    };

    $scope.search = function() {

        $scope.page = 1;

        $scope.searchParameters = {
            text: $scope.search.keyword,
            page: $scope.page,
            count: $scope.pageSize,
            category: Object.keys($scope.global.selectedCategories),
            material: Object.keys($scope.global.selectedMaterials),
            period: Object.keys($scope.global.selectedPeriods)
        };

        if($scope.global.hasDescription)
        {
            $scope.searchParameters.hasDescriptions = true;
        }
        if($scope.global.hasReference)
        {
            $scope.searchParameters.hasReference = true;
        }

        Artefacts.query($scope.searchParameters, function(artefacts) {

            $scope.artefacts = artefacts;
        });
    };

    $scope.nextPage = function() {

        $scope.page = parseInt($scope.page) + 1;

        $scope.searchParameters.page = $scope.page;

        Artefacts.query($scope.searchParameters, function(artefacts) {

            angular.forEach(artefacts, function(artefact){
                $scope.artefacts.push(artefact);
            });
        });

    };

    $scope.categories = function () {

        var categoriesModal = $modal.open({
            templateUrl: 'categories.html',
            controller: 'CategoriesController'
        });

        categoriesModal.result.then(function (selectedCategories) {

            $scope.global.selectedCategories = selectedCategories;
        });
    };

    $scope.materials = function () {

        var materialsModal = $modal.open({
            templateUrl: 'materials.html',
            controller: 'MaterialsController'
        });

        materialsModal.result.then(function (selectedMaterials) {
            $scope.global.selectedMaterials = selectedMaterials;
        });
    };

    $scope.periods = function () {

        var periodsModal = $modal.open({
            templateUrl: 'periods.html',
            controller: 'PeriodsController'
        });

        periodsModal.result.then(function (selectedPeriods) {
            $scope.global.selectedPeriods = selectedPeriods;
        });
    };
}]);