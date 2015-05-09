var gulp        = require('gulp');
var less		= require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  return gulp.src('src/less/styles.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('resources/public/css'));
});

gulp.task('watch', function() {
	gulp.watch("src/less/**/*.less", ['less']);
}) 