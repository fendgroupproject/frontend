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

// Define paths for different sets of files

var paths = {
  // Vendor provided css files
  vendorCss: [
    'src/vendor/bower_modules/bootstrap/dist/css/bootstrap.css',
    'src/vendor/bower_modules/bootstrap/dist/css/bootstrap-theme.css'
  ],
  
  // Vendor provided js files
  vendorJs: [
    'src/vendor/bower_modules/jquery/dist/jquery.js',
    'src/vendor/bower_modules/knockoutjs/dist/knockout.js',
    'src/vendor/bower_modules/requirejs/require.js',
    'src/vendor/bower_modules/bootstrap-sass-official/assets/javascripts/bootstrap.js'
  ],
  
  // Our porjects scss file ( one for now )
  projectCss: 'src/scss/main.scss',
  
  // Our other project files ( front-end js and html )
  projectFiles: ['src/js/**/*','src/index.html']
}

// Move our vendor files 

gulp.task('moveVendorJs', function(){
  return gulp.src(paths.vendorJs)
    .pipe(newer('build/js/vendor'))
    .pipe(gulp.dest('build/js/vendor'));
});

// Build our css

gulp.task('build-css', function(){
  return gulp.src(paths.projectCss)
    .pipe(newer('build/css'))
    .pipe(scss({ style: 'nested'}))
    .pipe(autoprefixer( '> 1%', 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/css'))
    .pipe(notify({ message: 'Styles built successfully'}));
});


// Move our project files

gulp.task('build-projectjs', function(){
  return gulp.src(paths.projectFiles, { base: 'src/js'})
    .pipe(newer('build/js'))
    .pipe(gulp.dest('build/js'));
});


//----------------------------------------------
//  User Tasks ( Things you might actually run )
//----------------------------------------------

// Clean our build directory
gulp.task('clean-build', function(cb){
  del('build/*', cb)
});

//Run a server for previewing /build
gulp.task('connect', function(){
  connect.server({
    root: ['build'],
    livereload: true
  });
})


// Watch our files for changes and fire tasks when they do
gulp.task('watch-build', function(){
  // Watch for files in the scss directory and its sub directories
  gulp.watch(paths.projectCss, ['build-css'])
  
  // Watch for files in the
  gulp.watch(paths.projectFiles, ['build-projectjs'])
  
  //create liveReload server
  //livereload.listen();

  //watch and reload /build on change
  //gulp.watch(['build/**']).on('change', livereload.changed);

});


// Clean any built directories

gulp.task('clean', ['clean-build']);

// Build preview into the /build directory

gulp.task('build', ['moveVendorJs', 'build-css', 'build-projectjs']);

// Watch the src files for changes and apply them immediately to the /build directory
// also inform livereload of the change

gulp.task('watch', ['build','watch-build','connect'])
