'use strict';

describe('Directive: timeline', function() {
  // load the directive's module
  beforeEach(module('cuttingEdgeDockerApp.timeline'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<timeline></timeline>');
    element = $compile(element)(scope);
    element.text().should.equal('this is the timeline directive');
  }));
});
