'use strict';

angular.module('instatags')
  .directive('itPlaceholderHint', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var hintList = scope.$eval(attrs.itPlaceholderHint),
            $inp = $(element),
            hint = { num: 0 };

        function setPlaceholder(val) {
          var q = Q.defer(),
              interval;

          interval = setInterval(function () {
            var cur = $inp.attr('placeholder') || '';

            if (val.length === cur.length) {
              clearInterval(interval);
              q.resolve();
            }

            if (val.length > cur.length) {
              $inp.attr('placeholder', cur + val[cur.length]);
            }

            if (val.length < cur.length) {
              $inp.attr('placeholder', cur.slice(0, -1));
            }
          }, 50);

          return q.promise;

        }


        setPlaceholder(hintList[hint.num]);
        hint.num += 1;

        setInterval(function () {
          if (hint.num === hintList.length) { hint.num = 0; }

          setPlaceholder('').then(function () {
            return Q.delay(500);
          }).then(function () {
            return setPlaceholder(hintList[hint.num]);
          }).then(function () {
            hint.num += 1;
          }).done();
        }, 2000);

      }
    };
  });
