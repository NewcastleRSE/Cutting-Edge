'use strict';

import timeline from './timeline.component';
import {
  TimelineController
} from './timeline.component';

describe('Component: TimelineComponent', function() {
  beforeEach(angular.mock.module(timeline));
  beforeEach(angular.mock.module('stateMock'));

  var scope;
  var timelineComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    timelineComponent = $componentController('timeline', {
      $http,
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    timelineComponent.$onInit();
    $httpBackend.flush();
    timelineComponent.awesomeThings.length.should.equal(4);
  });
});
