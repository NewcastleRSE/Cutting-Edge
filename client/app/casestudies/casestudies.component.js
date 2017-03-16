import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './casestudies.routes';

export class CaseStudyController {

    caseStudies = [];

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    $onInit() {
        this.$http.get('/api/artefacts?hasCaseStudy=true')
            .then(response => {
                this.caseStudies = response.data;
            });
    }
}

export default angular.module('cuttingEdgeDockerApp.casestudies', [uiRouter])
    .config(routing)
    .component('casestudies', {
        template: require('./casestudies.view.html'),
        controller: CaseStudyController
    })
    .name;