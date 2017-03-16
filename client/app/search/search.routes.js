'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('search', {
        url: '/search',
        template: '<search></search>'
    });
}
