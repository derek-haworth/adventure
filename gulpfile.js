'use strict';
// Include gulp
var gulp = require('gulp');
// Include plugins
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var stripCssComments = require('gulp-strip-css-comments');

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
 
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(''));
});

gulp.task('styles', function() {
  gulp.src('./assets/sass/main.scss')
  .pipe(sass({
    includePaths: require('node-normalize-scss').includePaths
  }))
  .pipe(autoprefixer())
  .pipe(stripCssComments({preserve: false})) //preserve: false strips all comments including '/*!' important
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./css'))
});

gulp.task('scripts', function() {
  return gulp.src('./assets/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest(''));
});

// gulp.task('default', ['minify','styles','scripts']);
gulp.task('default', ['styles','scripts']);
