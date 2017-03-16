'use strict';

export default function routes($stateProvider) {
    'ngInject';

    $stateProvider.state('artefact', {
        url: '/artefact/:artefactId',
        template: '<artefact></artefact>'
    });
}
