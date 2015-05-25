var gulp        = require('gulp');
var less		= require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
// var browserSync = require('browser-sync').create();

gulp.task('less', function () {
  return gulp.src('src/less/styles.less')
    .pipe(less())
    .pipe(autoprefixer({
    	browsers: ["> 1%", "last 2 versions", "Firefox ESR", "Opera 12.1", "BlackBerry 10", "Android 4"]
    }))
    .pipe(gulp.dest('resources/public/css'));
    // .pipe(browserSync.stream());
});

gulp.task('watch', ['less'], function() {
	gulp.watch("src/less/**/*.less", ['less']);
})

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "localhost:3000",
//         open: false
//     });
// });

gulp.task('default', ['watch']);