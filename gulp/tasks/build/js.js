module.exports = function(gulp, plugins, config) {
    gulp.task('js', function() {
        return gulp.src([
            './dev/js/init.js',
            './dev/js/main.js',
            './dev/js/libs.dependencies.js'
        ])
            .pipe(gulp.dest(config.target.dist.js));
    });
};
