'use strict';
const angular = require('angular');

export default angular.module('cuttingEdgeDockerApp.timeline', [])
    .directive('timeline', function($window, $http) {
        return {
            template: '<div></div>',
            restrict: 'EA',
            link: function(scope, element, attrs) {
                $http.get('/api/periods')
                    .then(response => {

                        let exclude = ['Unknown', 'Palaeolithic', 'Prehistoric'];

                        let periods = $window._.filter(response.data, function(period){
                            return !$window._.includes(exclude, period.name);
                        });

                        let periodQuery = $window._.map(periods, 'id');

                        angular.forEach(periods, function(period){

                            if(period.children.length > 0) {
                                periods = periods.concat(period.children);
                                periodQuery = periodQuery.concat($window._.map(period.children, 'id'));
                            }
                        });


                        $http.get('/api/artefacts?all=true', { params: { 'period': periodQuery } })
                            .then(response => {

                                let artefacts = $window._.groupBy(response.data, function(artefact){
                                    if(artefact && artefact.periods && artefact.periods.length > 0){
                                        return artefact.periods[0].id;
                                    }
                                });

                                console.log(artefacts);

                                let timelineData = {
                                    events: [],
                                    eras: []
                                };

                                angular.forEach(periods, function(period){

                                    console.log($window._.includes(Object.keys(artefacts), period.id));

                                    if($window._.includes(Object.keys(artefacts), period.id.toString()))
                                    {
                                        let era = {
                                            start_date: {
                                                year: period.periodStart.toString()
                                            },
                                            end_date: {
                                                year: period.periodEnd.toString()
                                            },
                                            text: {
                                                headline: period.name
                                            },
                                        };

                                        timelineData.eras.push(era);

                                        let html = '<div class="artefact-list">';

                                        angular.forEach(artefacts[period.id], function(artefact){

                                                console.log(artefact);

                                                html += '<div class="artefact">';
                                                html += '<a class="clearfix" href="/#!/artefact/' + artefact.id + '/">';
                                                html += '<img src="' + artefact.thumbnail + '" alt="' + artefact.simpleName + '" />';
                                                html += '<h5>' + artefact.simpleName + '</h5>';
                                                html += '<h6>' + artefact.findLocation.title + '</h6>';
                                                html += '</a></div>';
                                        });
                                            html += '</div>';

                                        let date = {
                                            start_date: {
                                                year: period.periodStart.toString()
                                            },
                                            end_date: {
                                                year: period.periodEnd.toString()
                                            },
                                            text: {
                                                headline: period.name + ' ' + period.name,
                                                text: html,
                                            },
                                            tag: period.name
                                        };

                                        timelineData.events.push(date);
                                    }
                                });

                                let timeline = new $window.TL.Timeline(element[0].id, timelineData);

                            });
                    });
            }
        };
    })
    .name;