'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('casestudies', {
        url: '/casestudies',
        template: '<casestudies></casestudies>'
    });
}
