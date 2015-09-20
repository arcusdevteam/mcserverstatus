var gulp   = require('gulp');
var watch  = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('js', function() {
    return gulp.src('./mcstatus.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./'));
});

gulp.task('js-watch', function() {
    watch('./mcstatus.js', function() {
        gulp.start(['js']);
    });
});

gulp.task('default', function() {
    gulp.start(['js', 'js-watch']);
});
