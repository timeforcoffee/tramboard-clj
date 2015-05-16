var gulp        = require('gulp');
var less		= require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function () {
  return gulp.src('src/less/styles.less')
    .pipe(less())
    .pipe(autoprefixer("> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "BlackBerry 10", "Android 4"))
    .pipe(gulp.dest('resources/public/css'));
});

gulp.task('watch', ['less'], function() {
	gulp.watch("src/less/**/*.less", ['less']);
})
