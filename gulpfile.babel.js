
import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import BrowserSync from 'browser-sync';
const browserSync = BrowserSync.create();



gulp.task('default', ['start-server'], function(){
   gulp.watch(['scripts/**/*.js', '!scripts/bundle.*', './*.html', './*.css'], ['build-all-and-reload'])
}).task('build-js', function(){
   return browserify('./scripts/app.js')
       .transform(babelify, {presets: ["es2015", "react"]})
       .bundle()
       .pipe(source('bundle.js'))
       .pipe(gulp.dest('./dist/scripts'));
}).task('build-html', function(cb){
 return gulp.src('./index.html')
  .pipe(gulp.dest('./dist'));
})
.task('copy-fonts', function(){
  gulp.src('./fonts/Roboto/*.ttf').pipe(gulp.dest('./dist/fonts/Roboto'));
  gulp.src('./fonts/Montserrat/*.ttf').pipe(gulp.dest('./dist/fonts/Montserrat'))
})
.task('clean', function(){
  del.sync('dist');
})
.task('start-server', ['build-all'], function(){
  browserSync.init({
    server : {
      baseDir : 'dist'
    },
    port: 8082,
    ui : {
      port : 8081
    }
  });
})
.task('build-all', ['clean', 'build-js', 'build-html', 'copy-fonts'], function(){})
.task('build-all-and-reload', ['build-js', 'build-html'],  function(){browserSync.reload()});
