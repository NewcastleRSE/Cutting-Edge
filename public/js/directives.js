'use strict';

angular.module('mean.timeline').directive('timelineJs',  function ($timeout, $log) {
    return {
        restrict: 'A',
        link: function (scope) {
            var postpone = $timeout(function() {

               createStoryJS({
                    type:'timeline',
                    width:'100%',
                    height:'600',
                    debug: true,
                    start_zoom_adjust:'1',
                    source:scope.timelineData,
                    embed_id:'artefact-timeline',
                    css:'lib/timeline.js/build/css/timeline.css',
                    js:'lib/timeline.js/build/js/timeline.js'
                });
            }, 0);
            $log.info('Running timelineJS');
        }
    };
});