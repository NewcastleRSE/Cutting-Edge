'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('periods', {
        url: '/periods',
        template: '<periods></periods>'
    });
}
