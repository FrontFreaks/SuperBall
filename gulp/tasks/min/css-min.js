module.exports = function(gulp, plugins, config) {
    gulp.task('cssmin', function() {
        gulp.src(config.target.css)
            .pipe(plugins.cssmin())
            // .pipe(rename({
            //     suffix: '.min'
            // }))
            .pipe(gulp.dest(config.target.dist.css));
    });
};
