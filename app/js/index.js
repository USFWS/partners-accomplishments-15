(function () {
  'use strict';

  var $ = require('jquery');
  var map = require('./map');
  var accomplishments = require('./data-access');
  var emitter = require('./mediator');

  var _ = {
    debounce: require('lodash.debounce')
  };

  var $window = $(window),
      $sections = $('section');

  // Scroll event handler to toggle the active story
  $window.scroll(_.debounce(function() {
    $sections.each(function() {
      var offset = $(this).offset();
      console.log(offset.bottom);
      if ( $window.scrollTop() > offset.bottom ){
        $sections.removeClass('active');
        $(this).next('section').addClass('active');
      } else if ( $window.scrollTop() === 0 ) {
        $sections.removeClass('active');
      }
    });
  }, 25));

  accomplishments.init();

  emitter.on('accomplishments:loaded', function (data) {
    map.init({ data: data });
  });
})();
