'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', 'Utilities', function ($scope, Global, Utilities) {
    $scope.global = Global;
    $scope.utilities = Utilities;

    $scope.menu = [
        {
            'title': 'Search',
            'link': 'search'
        },
        {
            'title': 'Case Studies',
            'link': 'case-studies'
        },
        {
            'title': 'Artefact',
            'link': 'artefact/random'
        },
        {
            'title': 'Timeline',
            'link': 'timeline'
        }
    ];
    
    $scope.isCollapsed = false;
}]);