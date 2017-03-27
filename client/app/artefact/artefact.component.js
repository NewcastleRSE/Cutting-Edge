import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './artefact.routes';

export class ArtefactController {

    artefact = {};

    /*@ngInject*/
    constructor($http, $state) {
        this.$http = $http;
        this.$state = $state;
    }

    $onInit() {
        let artefactId = this.$state.params.artefactId;
        let artefact = {};

        if(artefactId) {
            this.$http.get('/api/artefacts/' + artefactId)
                .then(response => {
                    artefact = response.data;

                    artefact.periods.forEach(function(period, index){
                        let start = period.periodStart < 0 ? (period.periodStart * -1) + 'BC' : period.periodStart + 'AD';
                        let end = period.periodEnd < 0 ? (period.periodEnd * -1) + 'BC' : period.periodEnd + 'AD';
                        artefact.periods[index].display = start + ' to ' + end;
                    });

                    artefact.images = _.filter(response.data.references, function (reference) {
                        return reference.type === 'IMAGE' && reference.contents.indexOf('1024') !== -1;
                    });

                    artefact.references = _.filter(response.data.references, function (reference) {
                        return reference.type === 'TEXT';
                    });

                    this.artefact = artefact;
                });
        } else {
            this.$http.get('/api/artefacts/random')
                .then(response => {
                    artefact = response.data[0];

                    artefact.periods.forEach(function(period, index){
                        let start = period.periodStart < 0 ? (period.periodStart * -1) + 'BC' : period.periodStart + 'AD';
                        let end = period.periodEnd < 0 ? (period.periodEnd * -1) + 'BC' : period.periodEnd + 'AD';
                        artefact.periods[index].display = start + ' to ' + end;
                    });

                    artefact.images = _.filter(response.data[0].references, function (reference) {
                        return reference.type === 'IMAGE' && reference.contents.indexOf('1024') !== -1;
                    });

                    artefact.references = _.filter(response.data[0].references, function (reference) {
                        return reference.type === 'TEXT';
                    });

                    this.artefact = artefact;
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
