var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var less		= require('gulp-less');

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// or...
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "yourlocal.dev"
    });
});

gulp.task('less', function () {
  return gulp.src('src/less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('resources/public/css'));
});

gulp.task('watch', function() {
	gulp.watch("src/less/**/*.less", ['less']);
}) 