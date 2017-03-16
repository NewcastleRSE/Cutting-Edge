'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('timeline', {
        url: '/timeline',
        template: '<timeline></timeline>'
    });
}
