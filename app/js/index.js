(function () {
  'use strict';

  var map = require('./map');
  var dataAccess = require('./data-access');
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

  dataAccess.init();
  emitter.on('states:loaded', function (states) {
    map.addStates(states);
  });
  emitter.on('accomplishments:loaded', function (data) {
    map.init({ data: data });
  });
})();
