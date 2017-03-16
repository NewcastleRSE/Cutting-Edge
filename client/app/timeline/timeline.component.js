import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './timeline.routes';

export class TimelineController {

    artefacts = [];

    /*@ngInject*/
    constructor($http) {
        this.$http = $http;
    }

    $onInit() {
        this.$http.get('/api/artefacts')
            .then(response => {
                this.artefacts = response.data;
            });
    }
}

export default angular.module('cuttingEdgeDockerApp.timeline', [uiRouter])
    .config(routing)
    .component('timeline', {
        template: require('./timeline.html'),
        controller: TimelineController
    })
    .name;
