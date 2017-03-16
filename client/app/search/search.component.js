import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './search.routes';

export class SearchController {

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

export default angular.module('cuttingEdgeDockerApp.search', [uiRouter])
    .config(routing)
    .component('search', {
        template: require('./search.view.html'),
        controller: SearchController
    })
    .name;
