var gulp   = require('gulp');
var watch  = require('gulp-watch');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
    return gulp.src('./mcstatus.js')
        .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('js-watch', function() {

});

gulp.task('default', function() {
    gulp.start(['js']);
});
