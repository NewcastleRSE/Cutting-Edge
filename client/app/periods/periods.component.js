import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './periods.routes';

export class PeriodsController {

    /*@ngInject*/
    constructor() {

    }

    $onInit() {

    }
}

export default angular.module('cuttingEdgeDockerApp.periods', [uiRouter])
    .config(routing)
    .component('periods', {
        template: require('./periods.view.html'),
        controller: PeriodsController
    })
    .name;