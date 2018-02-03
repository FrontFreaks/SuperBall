module.exports = function(gulp, plugins, config) {
    gulp.task('css', function() {
        gulp.src(config.target.cssAll)
            .pipe(gulp.dest(config.target.dist.css));
    });
};
