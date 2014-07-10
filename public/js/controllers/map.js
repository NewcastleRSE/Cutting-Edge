'use strict';

angular.module('mean.googleMap').controller('MapController', ['$scope', '$window', '$modal', '$log', '$routeParams', '$location', '$http', 'Global', 'Utilities', 'Artefacts', 'Domesday', 'Megalithic',
    function ($scope, $window, $modal, $log, $routeParams, $location, $http, Global, Utilities, Artefacts, Domesday, Megalithic) {

        if($window._.str.include($location.$$path,'map')){
            Global.map = true;
        } else {
            Global.map = false;
        }

        $window.google.maps.visualRefresh = true;

        $scope.global = Global;
        $scope.utilities = Utilities;

        $scope.searchOptions = {
            data: {
                museums: false,
                megalithic: false,
                domesday: false
            },
            mapType: 'terrain',
            radius: 25
        };

        $scope.artefactLocationMarker = {
            coords: {
                latitude: 0,
                longitude: 0
            },
            options: {
                draggable: false
            },
            events: {}
        };

        $scope.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            options: {
                streetViewControl: false,
                mapTypeControl: false,
                mapTypeId: $window.google.maps.MapTypeId.ROADMAP,
                panControlOptions: {
                    position: $window.google.maps.ControlPosition.TOP_RIGHT
                },
                zoomControlOptions: {
                    position: $window.google.maps.ControlPosition.TOP_RIGHT
                }
            },
            refresh: false,
            zoom: 8,
            markers: [],
            artefactMarkers: [],
            megalithicMarkers: [],
            domesdayMarkers: []
        };

        $scope.artefactWindow = {
            coords: {
                latitude: 0,
                longitude: 0
            },
            show: false,
            templateUrl: 'templates/artefact.html',
            content: {
                title: ''
            },
            close: function(){
                $scope.artefactWindow.show = false;
            }
        };

        $scope.megalithicWindow = {
            coords: {
                latitude: 0,
                longitude: 0
            },
            show: false,
            templateUrl: 'templates/megalithic.html',
            content: {
                title: ''
            },
            close: function(){
                $scope.megalithicWindow.show = false;
            }
        };

        $scope.domesdayWindow = {
            coords: {
                latitude: 0,
                longitude: 0
            },
            show: false,
            templateUrl: 'templates/domesday.html',
            content: {
                title: ''
            },
            close: function(){
                $scope.domesdayWindow.show = false;
            }
        };

        $scope.megalithicEnum = {
            access: [
                'No Data',
                'In the middle of nowhere, a nightmare to find',
                'A long walk',
                'Requiring a bit more of a walk',
                'Short walk on a footpath',
                'Can be driven to, probably with disabled access'
            ],
            ambience: [
                'No Data',
                'Awful',
                'Not Good',
                'Ordinary',
                'Good',
                'Superb'
            ],
            siteCondition: [
                'No Data',
                'Pretty much destory, possibly visible as crop marks',
                'Ruined but still recognisable as an ancient site',
                'Reasonable but with some damage',
                'Almost perfect',
                'Perfect'
            ]

        };

        var onMarkerClicked = function (marker) {
            marker.showWindow = true;
        };

        $scope.artefact = function() {

            Artefacts.get({
                artefactId: $routeParams.artefactId
            }, function(artefact) {

                $scope.artefact = artefact;

                $scope.artefactLocationMarker = {
                    coords: {
                        latitude: artefact.findLocation.location.coordinates[1],
                        longitude: artefact.findLocation.location.coordinates[0]
                    },
                    options: {
                        draggable: false
                    },
                    events: {}
                };

                $scope.map = {
                    center: {
                        latitude: artefact.findLocation.location.coordinates[1],
                        longitude: artefact.findLocation.location.coordinates[0]
                    },
                    options: {
                        streetViewControl: false,
                        mapTypeControl: false,
                        mapTypeId: $window.google.maps.MapTypeId.ROADMAP,
                        panControlOptions: {
                            position: $window.google.maps.ControlPosition.TOP_RIGHT
                        },
                        zoomControlOptions: {
                            position: $window.google.maps.ControlPosition.TOP_RIGHT
                        }
                    },
                    refresh: false,
                    zoom: 8,
                    markers: [],
                    artefactMarkers: [],
                    megalithicMarkers: [],
                    domesdayMarkers: [],
                    clusterDomesday: true,
                    clusterMegalithic: true,
                    clusterArtefact: true,
                    clusterDomesdayOptions: {title: 'Domesday Cluster', gridSize: 50, ignoreHidden: true, minimumClusterSize: 2, imageExtension: 'png', imagePath: '/img/map/cluster-domesday', imageSizes: [50]},
                    clusterMegalithicOptions: {title: 'Megalithic Cluster', gridSize: 50, ignoreHidden: true, minimumClusterSize: 2, imageExtension: 'png', imagePath: '/img/map/cluster-megalithic', imageSizes: [50]},
                    clusterArtefactOptions: {title: 'Museum Cluster', gridSize: 50, ignoreHidden: true, minimumClusterSize: 2, imageExtension: 'png', imagePath: '/img/map/cluster-museum', imageSizes: [50]}
                };

                $log.info($scope.map.options);
            });
        };

        $scope.search = function() {

            $scope.map.options.mapTypeId = $window.google.maps.MapTypeId.TERRAIN;

            if($scope.searchOptions.data.museums){
                Artefacts.query({
                    latitude:$scope.artefact.findLocation.location.coordinates[1],
                    longitude:$scope.artefact.findLocation.location.coordinates[0],
                    radius:($scope.searchOptions.radius * 1000)
                },function(artefacts) {

                    var markers = [];

                    angular.forEach(artefacts, function(artefact){

                        var marker = {
                            latitude: parseFloat(artefact.findLocation.location.coordinates[1]),
                            longitude: parseFloat(artefact.findLocation.location.coordinates[0]),
                            icon: '/img/map/marker-twam.png',
                            onClicked: function () {
                                onArtefactClicked(marker);
                            },
                            content: artefact
                        };

                        markers.push(marker);
                    });

                    $scope.map.artefactMarkers = markers;
                });
            }
            else{
                $scope.map.artefactMarkers = [];
            }

            if($scope.searchOptions.data.megalithic){
                var megalithicPromise = Megalithic.placesNear(
                    $scope.artefact.findLocation.location.coordinates[1],
                    $scope.artefact.findLocation.location.coordinates[0],
                    ($scope.searchOptions.radius * 1000));

                megalithicPromise.then(function(places) {

                    var markers = [];

                    angular.forEach(places, function(site){

                        var marker = {
                            latitude: parseFloat(site.location.coordinates[1]),
                            longitude: parseFloat(site.location.coordinates[0]),
                            icon: '/img/map/marker-megalithic.png',
                            type: 'megalithic',
                            onClicked: function () {
                                onMegalithicClicked(marker);
                            },
                            content: site
                        };

                        markers.push(marker);
                    });

                    $scope.map.megalithicMarkers = markers;
                });
            }else{
                $scope.map.megalithicMarkers = [];
            }

            if($scope.searchOptions.data.domesday){
                var domesdayPromise = Domesday.placesNear(
                    $scope.artefact.findLocation.location.coordinates[1],
                    $scope.artefact.findLocation.location.coordinates[0],
                    $scope.searchOptions.radius);

                domesdayPromise.then(function(places) {

                    var markers = [];

                    angular.forEach(places, function(village){

                        /*var manors = [];

                        angular.forEach(village.manors, function(manor){
                            var manorPromise = Domesday.manor(manor.id);
                            manorPromise.then(function(fullManor){

                                //$log.info(fullManor);

                                //manors.push(fullManor);
                            })
                        });

                        village.manors = manors;*/

                        //$log.info(village);

                        var place = (village.location.substr(7));
                        var placeArray = (place.substring(0, place.length - 1)).split(' ');

                        var marker = {
                            latitude: parseFloat(placeArray[1]),
                            longitude: parseFloat(placeArray[0]),
                            icon: '/img/map/marker-domesday.png',
                            type: 'domesday',
                            onClicked: function () {
                                onDomesdayClicked(marker);
                            },
                            content: village
                        };

                        markers.push(marker);
                    });

                    $scope.map.domesdayMarkers = markers;
                });
            }else{
                $scope.map.domesdayMarkers = [];
            }

           //$scope.map.refresh = true;
        };

        function onArtefactClicked(marker) {

            $log.info(marker);

            $scope.artefactWindow = {
                coords: {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                },
                showWindow: true,
                onClicked: function () {
                    onMarkerClicked(marker);
                }
            };

            $scope.$apply();
        }

        function onMegalithicClicked(marker) {

            $scope.megalithicWindow = {
                coords: {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                },
                showWindow: true,
                onClicked: function () {
                    onMarkerClicked(marker);
                }
            };

            $scope.$apply();
        }

        function onDomesdayClicked(marker) {

            $log.info(marker);

            $scope.domesdayWindow = {
                coords: {
                    latitude: marker.latitude,
                    longitude: marker.longitude
                },
                showWindow: true,
                onClicked: function () {
                    onMarkerClicked(marker);
                }
            };

            $scope.$apply();
        }
    }
]);