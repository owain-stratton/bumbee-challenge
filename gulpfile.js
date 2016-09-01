'use strict';
var gulp          = require('gulp'),
    browserify    = require('browserify'),
    source        = require('vinyl-source-stream'),
    maps          = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify'),
    cleanCSS      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    sass          = require('gulp-sass');

var packageJson    = require('./package.json');
var dependencies   = Object.keys(packageJson && packageJson.dependencies || {});

// TASKS
// browserify compile vendor scripts
gulp.task('vendors', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(gulp.dest(__dirname + '/public/scripts/libs'))
});

// browserify compile app scripts
gulp.task('app', function() {
  return browserify('src/app/app.js')
    .external(dependencies)
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(__dirname + '/public/scripts'));
});

// compile css from sass
gulp.task('compileSass', function() {
  return gulp.src('src/styles/scss/app.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest(__dirname + '/public/styles/css'));
});

// copy leaflet.css to public folder
gulp.task('copyLeafletCSS', function() {
  return gulp.src('node_modules/leaflet/dist/leaflet.css')
    .pipe(gulp.dest(__dirname + '/public/styles/css'));
});

// copy leafelt images folder
gulp.task('copyLeafletImages', function() {
  return gulp.src('node_modules/leaflet/dist/images/*')
    .pipe(gulp.dest(__dirname + '/public/styles/css/images'));
});

// watch files for changes
gulp.task('watch', function() {
  gulp.watch('package.json', ['vendors']);
  gulp.watch('src/app/**', ['app']);
  gulp.watch('src/styles/scss/*.scss', ['compileSass']);
});

// minify js scripts
gulp.task('minifyVendorScripts', function() {
  return gulp.src('public/scripts/libs/vendor.bundle.js')
    .pipe(uglify())
    .pipe(rename('vendor.bundle.min.js'))
    .pipe(gulp.dest('public/scripts/libs'));
});

gulp.task('minifyAppScripts', function() {
  return gulp.src('public/scripts/app.bundle.js')
    .pipe(uglify())
    .pipe(rename('app.bundle.min.js'))
    .pipe(gulp.dest('public/scripts'));
});


// minify compiled css
gulp.task('minifyCSS', function() {
  return gulp.src('public/styles/css/app.css')
    .pipe(cleanCSS())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('public/styles/css'));
});


// build dist folder for completion
gulp.task('build', ['minifyVendorScripts', 'minifyAppScripts', 'minifyCSS']);

gulp.task('serve', ['watch', 'compileSass', 'app', 'vendors', 'copyLeafletCSS', 'copyLeafletImages']);
