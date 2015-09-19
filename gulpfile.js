var gulp   = require('gulp');
var watch  = require('gulp-watch');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src('./mcstatus.js')
        .pipe(watch('./mcstatus.js'))
        .pipe(gulp.dest('./mcstatus.min.js'))
});

gulp.task('default', function() {
    gulp.start(['js']);
});
