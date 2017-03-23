'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap'

export class ModalController {

    layers = {};
    center = {};
    markers = {};
    items = ['item1', 'item2', 'item3'];

    /*@ngInject*/
    constructor($http, $scope, $uibModal) {
        this.$http = $http;
        this.$uibModal = $uibModal;
        this.$scope = $scope;
    }

    $onInit() {

        let $ctrl = this;

        $ctrl.$onInit = function () {
            $ctrl.marker = $ctrl.resolve.marker;

        };

        $ctrl.ok = function () {
            $ctrl.close({$value: $ctrl.marker});
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }
}

export default angular.module('cuttingEdgeDockerApp.map', [uiRouter, uiBootstrap])
    .component('mapModal', {
        template: 'myModalContent.html',
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        },
        controller: ModalController
    })
    .name;