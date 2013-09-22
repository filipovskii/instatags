'use strict';

angular.module('instatags')
  .controller('MainCtrl', function ($scope, $state, $stateParams) {

    function search() {
      var authorByName = {};
      $scope.authors = [];

      $.getJSON('https://api.instagram.com/v1/tags/' +
        encodeURIComponent($scope.tag) +
        '/media/recent?callback=?' +
        '&client_id=6b969ecebfb14b559e7b1e327c334116').then(function (res) {

          $scope.$apply(function () {
            _.forEach(res.data, function (img) {
              var author = img.user;

              if (img.type !== 'image') { return; }

              if (!_.has(authorByName, author.username)) {
                authorByName[author.username] = author;
                $scope.authors.push(author);
              }

              author = authorByName[author.username];
              author.images = author.images || [];
              author.images.push(img);
            });

            _.forEach($scope.authors, function (author) {
              author.likesCount = 0;

              _.forEach(author.images, function (img) {
                console.log(img);
                author.likesCount += img.likes.count;
              });

              author.likesPerImage = (
                author.likesCount /
                author.images.length);

            });

          });
        });

    }


    $scope.tag = $stateParams.q || '';

    $scope.tagExamples = [
      'art',
      'puppies',
      'insta',
      'vsco',
      'kittens'
    ];


    $scope.$watch('tag', function () {
      $scope.authors = [];
    });


    $scope.search = function () {
      $state.go('main', { q: $scope.tag });
    };


    if ($scope.tag) { search(); }
  });
