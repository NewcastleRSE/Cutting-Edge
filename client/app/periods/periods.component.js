import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './periods.routes';

export class PeriodsController {

    awesomeThings = [];
    newThing = '';

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

export default angular.module('cuttingEdgeDockerApp.periods', [uiRouter])
    .config(routing)
    .component('periods', {
        template: require('./periods.view.html'),
        controller: PeriodsController
    })
    .name;