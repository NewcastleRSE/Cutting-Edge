import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './artefact.routes';

function ModalInstanceCtrl($uibModalInstance, artefact) {
    this.artefact = artefact;
    this.ok = function () {
        $uibModalInstance.close();
    };
}

ModalInstanceCtrl.$inject = ['$uibModalInstance', 'artefact'];

export class ArtefactController {
    artefact = {};
    /*@ngInject*/
    constructor($http, $state, $uibModal) {
        this.$http = $http;
        this.$state = $state;
        this.$uibModal = $uibModal;
    }
    $onInit() {

        let $uibModal = this.$uibModal;
        let artefactId = this.$state.params.artefactId;
        let artefact = {};

        function camelize(str) {
            let camelcase = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
                if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
                return index == 0 ? match.toLowerCase() : match.toUpperCase();
            });
            camelcase = camelcase.replace('/', '');
            camelcase = camelcase.replace('-', '');
            return camelcase;
        }

        if(artefactId) {
            this.$http.get('/api/artefacts/' + artefactId)
                .then(response => {
                    artefact = response.data;

                    if(artefact.caseStudy){
                        let caseStudy = {};
                        artefact.caseStudy.forEach(function(property){
                            caseStudy[camelize(property.name)] = property.value;
                        });
                        artefact.caseStudy = caseStudy;
                    }

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
        this.openModal = function(artefact, modalClass = 'modal-default') {

            console.log(artefact);

            return $uibModal.open({
                template: require('./case-study.modal.html'),
                windowClass: modalClass,
                size: 'lg',
                controller: ModalInstanceCtrl,
                controllerAs: '$ctrl',
                resolve: {
                    artefact: function () {
                        return artefact;
                    }
                }
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
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .name;
