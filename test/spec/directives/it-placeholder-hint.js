'use strict';

describe('Directive: itPlaceholderHint', function () {

  // load the directive's module
  beforeEach(module('instatagsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<it-placeholder-hint></it-placeholder-hint>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the itPlaceholderHint directive');
  }));
});
