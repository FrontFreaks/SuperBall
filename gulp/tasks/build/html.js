module.exports = function(gulp, plugins, config) {
    gulp.task('html', function() {
        gulp.src(config.target.html)
            .pipe(gulp.dest(config.target.dist.html));
    });
};
