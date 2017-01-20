
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import Proxy from 'gulp-connect-proxy';
import BrowserSync from 'browser-sync';
const browserSync = BrowserSync.create();
import proxyMiddleware from 'http-proxy-middleware';
import {shortenUrl, getStatsUrl} from './scripts/services';

const apiProxy = proxyMiddleware([shortenUrl, getStatsUrl], {
  target: 'http://gymia-shorty.herokuapp.com',
  changeOrigin: true,
  logLevel: 'debug',
  pathRewrite : (path, req)=>{
    if(path.indexOf(getStatsUrl)===0){
      let updPath =  path.replace(getStatsUrl, '') + getStatsUrl;
      console.log('new path', updPath);
      return updPath;
    }
    return path;
  }
});


gulp.task('default', ['start-server'], function(){
   gulp.watch(['scripts/**/*.js', '!scripts/bundle.*', './*.html', 'css/*.css'], ['build-all-and-reload'])
}).task('build-js', function(){
   return browserify('./scripts/app.js')
       .transform(babelify, {presets: ["es2015", "react"]})
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./dist/scripts'));
}).task('copy-html-css', function(cb){
  gulp.src('./index.html').pipe(gulp.dest('./dist'));
  return gulp.src('./css/*.css').pipe(gulp.dest('./dist/css'));
})
.task('clean', function(){
  del.sync('dist');
})
.task('start-server', ['build-all'], function(){
  browserSync.init({
    server : {
      baseDir : 'dist'
    },
    middleware : [apiProxy],
    port: 8082,
    ui : {
      port : 8081
    }
  });
})
.task('build-all', ['clean', 'build-js', 'copy-html-css'], function(){})
.task('build-all-and-reload', ['build-js','copy-html-css'],  function(){browserSync.reload()});
