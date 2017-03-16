import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './artefact.routes';

export class ArtefactController {

    awesomeThings = [];
    newThing = '';

    /*@ngInject*/
    constructor($http, $state) {
        this.$http = $http;
        this.$state = $state;
    }

    $onInit() {
        var artefactId = this.$state.params.artefactId;

        if(artefactId) {
            this.$http.get('/api/artefacts/' + artefactId)
                .then(response => {
                    this.artefact = response.data;
                });
        } else {
            this.$http.get('/api/artefacts/random')
                .then(response => {
                    this.artefact = response.data;
                });
        }
    }
}

export default angular.module('cuttingEdgeDockerApp.artefact', [uiRouter])
    .config(routing)
    .component('artefact', {
        template: require('./artefact.view.html'),
        controller: ArtefactController
    })
    .name;
