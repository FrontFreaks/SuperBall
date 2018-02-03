module.exports = function(gulp, plugins) {
    gulp.task('jsofus', function() {
        return gulp.src(['./dev/js/ofus/dev/**/*.js'])
            .pipe(plugins.uglify())
            .pipe(gulp.dest('./dev/js/ofus/min/'));
    });
};
