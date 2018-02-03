module.exports = function(gulp, plugins, config) {
    gulp.task('jsmin', function() {
        return gulp.src(config.target.js)
            .pipe(plugins.uglify())
            // .pipe(rename({
            //     suffix: '.min'
            // }))
            .pipe(gulp.dest(config.target.dist.js));
    });
};
