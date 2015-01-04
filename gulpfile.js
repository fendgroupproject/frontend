// Load the plugins
var gulp = require('gulp'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  del = require('del'),
  newer = require('gulp-newer'),
  changed = require('gulp-changed'),
  connect = require('gulp-connect');

//----------------------------------------------
//  Utilities
//----------------------------------------------

// Clean our build directory
gulp.task('clean-build', function(cb){
  del('build/*', cb)
});

//----------------------------------------------
//  Build Tasks
//----------------------------------------------

var config = require('./build.config.json'); // Load our build config ( paths )

// Build Vendor Files & Directories

gulp.task('toJsVendor', function(){
  return gulp.src(config.vendor.js)
    .pipe(newer(config.build_dir + config.vendor.js_target))
    .pipe(gulp.dest(config.build_dir + config.vendor.js_target));
});

gulp.task('toJsVendorBootstrap', function(){
  return gulp.src(config.vendor.bootstrap_js)
    .pipe(newer(config.build_dir + config.vendor.bootstrap_js_target))
    .pipe(gulp.dest(config.build_dir + config.vendor.bootstrap_js_target));
});

gulp.task('toVendorFonts', function(){
  return gulp.src(config.vendor.fonts)
    .pipe(newer(config.build_dir + config.vendor.fonts_target))
    .pipe(gulp.dest(config.build_dir + config.vendor.fonts_target));
});

// Build Project Files & Directories

gulp.task('build-css', function(){
  return gulp.src(config.project.css)
    .pipe(newer(config.build_dir + config.project.css_target))
    .pipe(scss({ style: 'nested'}))
    .pipe(autoprefixer( '> 1%', 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(config.build_dir + config.project.css_target))
    .pipe(notify({ message: 'Styles built successfully'}));
});

gulp.task('build-project-js', function(){
  return gulp.src(config.project.js, { base: config.project.js_base })
    .pipe(newer(config.build_dir))
    .pipe(gulp.dest(config.build_dir + config.project.js_target ));
});

gulp.task('build-project-views', function(){
  return gulp.src(config.project.views)
    .pipe(newer(config.build_dir))
    .pipe(gulp.dest(config.build_dir));
});

// Build Test Files and Directories

gulp.task('toJsTest', function(){
  return gulp.src(config.test.js)
    .pipe(newer(config.build_dir + config.test.js_target))
    .pipe(gulp.dest(config.build_dir + config.test.js_target));
});


//----------------------------------------------
//  Watch Tasks
//----------------------------------------------

//Watch our directories for changes, and file tasks when they do
gulp.task('watch-build', function(){

  // Watch for files in the scss directory and its sub directories
  gulp.watch(config.project.css, ['build-css'])
  
  // Watch for project js files & subdirectories
  gulp.watch(config.project.js, ['build-project-js'])

    // Watch for project js files & subdirectories
  gulp.watch(config.project.views, ['build-project-views'])

});


//----------------------------------------------
//  User Tasks ( Things you might actually run )
//----------------------------------------------

//Run a server for previewing /build
gulp.task('connect', function(){
  connect.server({
    root: ['build'],
    livereload: true
  });
})

// Clean any built directories

gulp.task('clean', ['clean-build']);

// Build preview into the /build directory

gulp.task('build', ['toJsVendor', 'toJsVendorBootstrap', 'toVendorFonts' , 'build-css', 'build-project-js', 'build-project-views', 'toJsTest']);

// Watch the src files for changes and apply them immediately to the /build directory
// also inform livereload of the change

gulp.task('watch', ['build','watch-build','connect'])

