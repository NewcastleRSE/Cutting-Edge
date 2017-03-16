'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('about', {
        url: '/about',
        templateUrl: 'about.view.html'
    });
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'contact.view.html'
    });
    $stateProvider.state('faq', {
        url: '/faq',
        templateUrl: 'faq.view.html'
    });
    $stateProvider.state('providers', {
        url: '/providers',
        templateUrl: 'providers.view.html'
    });
}
