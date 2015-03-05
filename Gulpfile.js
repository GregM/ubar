var gulp  = require('gulp'),
    mocha = require('gulp-mocha'),
    less  = require('gulp-less'),
    jshint  = require('gulp-jshint'),
    uglify = require('gulp-uglify');

var browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourceFile = './js/ubar/ubar.js',
    destFolder = './',
    destFile = './ubar.min.js';

gulp.task('browserify', function() {
  return browserify(sourceFile)
           .bundle()
           .pipe(source(destFile))
           .pipe(buffer())
           .pipe(uglify())
           .pipe(gulp.dest(destFolder));
});

gulp.task('watch', function() {
  var bundler = watchify(sourceFile);
  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
             .pipe(source(destFile))
             .pipe(gulp.dest(destFolder));
  }

  return rebundle();
});

gulp.task('less', function() {
  return gulp.src('css/ubar/*.less')
           .pipe(less())
           .pipe(gulp.dest('css/ubar'));
});

gulp.task('lint', function() {
  gulp.src('js/ubar/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
  return gulp.src('test/specs/*.js', {read: false})
           .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['browserify', 'watch' /*, 'less', 'lint', 'test' */ ], function() {

  gulp.watch('js/ubar/*.js', ['lint' /*, 'test' */ ]);
  gulp.watch('css/ubar/*.less', ['less']);
});
