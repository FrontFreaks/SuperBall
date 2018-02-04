module.exports = function(gulp, plugins) {
    gulp.task('jsconcat', function() {
        return gulp.src([
            './dev/js/components/**.*',
            './dev/js/init.js'
            ])
            .pipe(plugins.concat('main.js'))
            .pipe(gulp.dest('./dev/js/'))
            .pipe(plugins.browserSync.stream());
    });
};
