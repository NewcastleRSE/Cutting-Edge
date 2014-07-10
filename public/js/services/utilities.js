'use strict';

//Global service for global variables
angular.module('mean.system').factory('Utilities', ['$window', function($window) {
        var utilities = this;

        utilities.getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        utilities.convertToEra = function(string) {

            var _ = $window._;

            if(_.str.startsWith(string, '-')){
                return _.str.trim(string, '-') + ' BC';
            }
            else{
                return string + ' AD';
            }
        };

        return utilities;
    }
]);