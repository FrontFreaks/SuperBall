module.exports = function(gulp, plugins, config) {
    gulp.task('cacheJade', function() {
        return gulp.src(config.target.jadeWatch)
            //cachea el contenido y el archivo
            .pipe(plugins.cached('jade'));
    });
};
