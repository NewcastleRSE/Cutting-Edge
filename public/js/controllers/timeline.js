'use strict';

angular.module('mean.timeline').controller('TimelineController', ['$scope', '$log', '$window', 'Global', 'Periods', 'Artefacts', function ($scope, $log, $window, Global, Periods, Artefacts) {

    $scope.global = Global;

    $scope.timelineReady = false;

    Periods.getPeriods().then(function(periods){

        var timelineData = {
            headline:'',
            type:'default',
            text:'<img src="/img/splash.jpg">',
            date:[],
            era:[]
        };

        angular.forEach(periods, function(period){

            var exclude = ['Unknown', 'Palaeolithic', 'Prehistoric'];

            if(!$window._.contains(exclude, period.name))
            {
                if(period.children.length > 0)
                {
                    var era = {
                        startDate: period.periodStart.toString(),
                        endDate: period.periodEnd.toString(),
                        headline: period.name,
                        tag: period.name
                    };

                    timelineData.era.push(era);

                    angular.forEach(period.children, function(subPeriod){

                        var searchParameters = {
                            period: subPeriod.id
                        };

                        Artefacts.query(searchParameters, function(artefacts) {

                            var html = '<div class="artefact-list">';

                            if(artefacts.length > 0)
                            {
                                angular.forEach(artefacts, function(artefact) {

                                    html += '<div class="artefact">';
                                    html += '<a class="clearfix" href="/#!/artefact/' + artefact.id + '/">';
                                    html += '<img src="' + artefact.thumbnail + '" alt="' + artefact.simpleName + '" />';
                                    html += '<h5>' + artefact.simpleName + '</h5>';
                                    html += '<h6>' + artefact.findLocation.title + '</h6>';
                                    html += '</a></div>';
                                });

                                html += '</div>';

                                var date = {
                                    startDate: subPeriod.periodStart.toString(),
                                    endDate: subPeriod.periodEnd.toString(),
                                    headline: period.name + ' ' + subPeriod.name,
                                    text: html,
                                    tag: period.name
                                };

                                timelineData.date.push(date);
                            }
                        });
                    });
                }
            }
        });

        var timeline = {
            timeline: timelineData
        };

        $scope.timelineData = timeline;
        $scope.timelineReady = true;
    });
}]);