'use strict';

let gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-csso'),
  rename = require('gulp-rename'),
  watch = require('gulp-watch'),
  stylus = require('gulp-stylus'),
  rigger = require('gulp-rigger'),
  pug = require('gulp-pug'), 
  server = require('browser-sync').create(),
  reload = server.reload;

gulp.task('webserver', function() {
  server.init({
    server: 'build/',
    index: 'index.html'
  });
  gulp.watch('src/style/**/*.{styl,css}', gulp.series('style:build'));
  gulp.watch('src/**/*.pug', gulp.series('html:build'));
  gulp.watch('src/js/**/*.js', gulp.series('js:build'));
});

gulp.task('html:build', function() {
  return gulp.src('src/pug/*.pug')
    .pipe(rigger())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('js:build', function() {
  return gulp.src('src/js/*.js')
    .pipe(rigger())
    .pipe(gulp.dest('build/script'))
    .pipe(server.stream());
});

gulp.task('style:build', function() {
  return gulp.src('src/style/*.{styl,css}')
    .pipe(stylus())
    .pipe(prefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('build/style'))
    .pipe(server.stream());
});

gulp.task('fonts:build', function() {
  return gulp.src('src/fonts/*.woff2')
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('image:build', function() {
  return gulp.src('src/images/**/*.{jpeg,jpg,png,svg,gif}')
    .pipe(gulp.dest('build/images'));
});

gulp.task('video:build', function() {
  return gulp.src('src/video/*.mp4')
    .pipe(gulp.dest('build/video'));
});

const build = gulp.series('fonts:build', 'image:build', 'video:build', 'html:build', 'style:build', 'js:build', 'webserver');

gulp.task('build', build);
