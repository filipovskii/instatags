'use strict';

angular.module('instatags', [ 'ui.router' ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/{q}',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
