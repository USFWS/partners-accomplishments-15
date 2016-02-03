(function () {
  'use strict';
  var sharp = require('sharp');
  var mkdirp = require('mkdirp');
  var Imagemin = require('imagemin');
  var imageminPngquant = require('imagemin-pngquant');
  var imageminJpegtran = require('imagemin-jpegtran');
  var rename = require('gulp-rename');
  var fs = require('fs');

  var input = 'app/img/photos/';
  var output = 'dist/img/';
  var images = fs.readdirSync(input);

  // If there's a DS Store item, remove it
  var i = images.indexOf('.DS_Store');
  if (i > -1) images.splice(i,1);

  // Ensure the output dir exists
  mkdirp(output, function (err) {
    if (err) console.error(err);
    images.forEach(function (name) {
      var img = sharp(input + name);
      img
        .resize(1000, 600)
        .max()
        .toBuffer(function(err, buffer, info) {

          new Imagemin()
            .src(buffer)
            .dest(output)
            .use(imageminPngquant())
            .use(imageminJpegtran({progressive: true}))
            .use(rename(name))
            .run();
        });
    });
  });
})();
