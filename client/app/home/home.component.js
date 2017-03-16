import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './home.routes';

export class HomeController {

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

export default angular.module('cuttingEdgeDockerApp.home', [uiRouter])
    .config(routing)
    .component('home', {
        template: require('./home.view.html'),
        controller: HomeController
    })
    .name;