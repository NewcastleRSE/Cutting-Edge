'use strict';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './map.routes';
import uiBootstrap from 'angular-ui-bootstrap'

function ModalInstanceCtrl($uibModalInstance, marker) {
    let $ctrl = this;

    console.log(marker);

    $ctrl.ok = function () {
        $uibModalInstance.close();
    };
}

ModalInstanceCtrl.$inject = ['$uibModalInstance', 'marker'];

export class MapController {

    layers = {};
    center = {};
    markers = {};

    /*@ngInject*/
    constructor($http, $rootScope, $scope, $uibModal) {
        this.$http = $http;
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
    }

    $onInit() {

        let $uibModal = this.$uibModal;
        let $rootScope = this.$rootScope;
        let marker = {};

        function openModal(marker, modalClass = 'modal-default') {

            return $uibModal.open({
                template: require('./map.modal.html'),
                windowClass: modalClass,
                controller: ModalInstanceCtrl,
                controllerAs: '$ctrl',
                resolve: {
                    marker: function () {
                        return marker;
                    }
                }
            });
        }

        let icons = {
            blue: {
                type: 'div',
                iconSize: [10, 10],
                className: 'blue',
                iconAnchor:  [5, 5]
            },
            red: {
                type: 'div',
                iconSize: [10, 10],
                className: 'red',
                iconAnchor:  [5, 5]
            }
        };

        this.layers = {
            baselayers: {
                openStreetMap: {
                    name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
            },
            overlays: {
                red: {
                    type: 'group',
                        name: 'red',
                        visible: true
                },

                blue: {
                    type: 'group',
                        name: 'blue',
                        visible: true
                }
            }
        };

        this.markers = {

            stoke: {
                layer: 'blue',
                    lat: 51.5615,
                    lng: -0.0731,
                    icon: icons.blue
            },

            dalston: {
                layer: 'blue',
                    lat: 51.545,
                    lng: -0.070,
                    icon: icons.blue
            },

            wandsworth: {
                layer: 'red',
                    lat: 51.4644,
                    lng:-0.1924,
                    icon: icons.red
            },

            battersea: {
                layer: 'red',
                    lat: 51.4638,
                    lng: -0.1677,
                    icon: icons.red
            }
        };

        this.center = {
            lat: 51.505,
            lng: -0.09,
            zoom: 11
        };

        this.$http.get('/api/artefacts?all=true')
            .then(response => {
                this.caseStudies = response.data;
            });

        this.$scope.$on('leafletDirectiveMarker.click', function(event, args){
            let modal = openModal(args.leafletObject.options);
        });
    }
}

export default angular.module('cuttingEdgeDockerApp.map', [uiRouter, uiBootstrap])
    .config(routing)
    .component('map', {
        template: require('./map.view.html'),
        controller: MapController
    })
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)
    .name;