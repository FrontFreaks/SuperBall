module.exports = function(gulp, plugins, config) {
    gulp.task('bower', function() {
        gulp.src(config.target.bower)
            .pipe(gulp.dest(config.target.dist.bower));
    });
};
