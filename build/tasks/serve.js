var gulp = require('gulp');
var url = require('url');
var proxy = require('proxy-middleware');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  var proxyOptions = url.parse('http://localhost:8080/contract-live');
  proxyOptions.route = '/api';

  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: [proxy(proxyOptions), function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }]
    }
  }, done);
});
