'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('map', {
        url: '/map',
        template: '<map></map>'
    });
}
