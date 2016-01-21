(function () {
  'use strict';

  var map = require('./map');
  var accomplishments = require('./data-access');
  var emitter = require('./mediator');

  var _ = {
    each: require('lodash.foreach')
  };

  var pages = document.querySelectorAll('.page');

  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('advance-slide')) {
      var target = e.target.getAttribute('href').slice(1);
      e.preventDefault();
      emitter.emit('advance:slide', e.target);

      _.each(pages, function (page) {
        page.classList.remove('active');
        if (page.getAttribute('data-state') === target)
          page.classList.add('active');
      });
    }
  });

  accomplishments.init();

  emitter.on('accomplishments:loaded', function (data) {
    map.init({ data: data });
  });
})();
