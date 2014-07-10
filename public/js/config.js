'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/search', {
            templateUrl: 'views/artefacts/list.html'
        }).
        when('/artefact/:artefactId', {
            templateUrl: 'views/artefacts/view.html'
        }).
        when('/case-studies', {
            templateUrl: 'views/casestudies/list.html'
        }).
        when('/case-studies/:artefactId', {
            templateUrl: 'views/casestudies/view.html'
        }).
        when('/artefact/:artefactId/map', {
            templateUrl: 'views/map/map.html'
        }).
        when('/timeline', {
            templateUrl: 'views/timeline/timeline.html'
        }).
        when('/about', {
            templateUrl: 'views/about/about.html'
        }).
        when('/providers', {
            templateUrl: 'views/about/providers.html'
        }).
        when('/faq', {
            templateUrl: 'views/about/faq.html'
        }).
        when('/contact', {
            templateUrl: 'views/about/contact.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

/*angular.module('mean').run(function ($rootScope, $location, $window, Global) {

    // enumerate routes that don't need authentication
    var routesThatDontRequireAuth = ['/about','/providers','/faq','/contact'];

    // check if current location matches route
    var routeClean = function (route) {

        return $window._.find(routesThatDontRequireAuth,
            function (noAuthRoute) {
                return $window._.str.startsWith(route, noAuthRoute);
            });
    };

    $rootScope.$on('$routeChangeStart', function () {
        // if route requires auth and user is not logged in
        if (!routeClean($location.url()) && !Global.authenticated) {
            // redirect back to login
            $window.location.href = '/signin';
        }
    });
});*/

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);