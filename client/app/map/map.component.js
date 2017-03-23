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

        let markers = this.markers;
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
            artefact: {
                type: 'div',
                iconSize: [10, 10],
                className: 'red',
                iconAnchor:  [5, 5]
            },
            megalithic: {
                type: 'div',
                iconSize: [10, 10],
                className: 'red',
                iconAnchor:  [5, 5]
            },
            domesday: {
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
                artefact: {
                    type: 'markercluster',
                    name: 'Artefact',
                    visible: true
                },
                megalithic: {
                    type: 'markercluster',
                    name: 'Megalithic',
                    visible: true
                },
                domesday: {
                    type: 'markercluster',
                    name: 'Domesday',
                    visible: true
                }
            }
        };

        this.center = {
            lat: 51.505,
            lng: -0.09,
            zoom: 11
        };

        this.$http.get('/api/artefacts?latitude=' + this.center.lat + '&longitude=' + this.center.lng + '&radius=100000')
            .then(response => {
                angular.forEach(response.data, function(artefact){
                    markers['artefact_' + artefact.id] = {
                        layer: 'artefact',
                        lat: artefact.findLocation.location.coordinates[1],
                        lng: artefact.findLocation.location.coordinates[0],
                        icon: icons.artefact,
                        content: artefact
                    }
                });

                console.log(markers);
            });

        this.$http.get('/api/megalithic?latitude=' + this.center.lat + '&longitude=' + this.center.lng + '&radius=100000')
            .then(response => {
                angular.forEach(response.data, function(megalithic){
                    markers['megalithic_' + megalithic.id] = {
                        layer: 'megalithic',
                        lat: parseFloat(megalithic.location.coordinates[1]),
                        lng: parseFloat(megalithic.location.coordinates[0]),
                        icon: icons.megalithic,
                        content: megalithic
                    }
                });
            });

        //http://opendomesday.org/api/1.0/placesnear/?lat=52.5&lng=1.0&radius=10
        this.$http.get('http://opendomesday.org/api/1.0/placesnear/?lat=52.5&lng=1.0&radius=25')
            .then(response => {
                angular.forEach(response.data, function(domesday){

                    var place = (village.location.substr(7));
                    var placeArray = (place.substring(0, place.length - 1)).split(' ');

                    markers['domesday_' + domesday.id] = {
                        layer: 'domesday',
                        lat: parseFloat(placeArray[1]),
                        lng: parseFloat(placeArray[0]),
                        icon: icons.domesday,
                        content: domesday
                    }
                });
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