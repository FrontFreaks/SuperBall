module.exports = function(gulp, plugins, config, functions) {
    gulp.task('jade', function() {
        return gulp.src(config.target.jadeWatch)
        .pipe(plugins.plumber({
            errorHandler: function(err) {
                return functions.errorHandler(gulp, plugins, config, err, this);
            }
        }))

        //coge solo el main y sus partials que han sido cambiados
        .pipe(plugins.changed(config.target.jadeFolder, { extension: '.html' }))

        //cachea el contenido y el archivo
        // .pipe(gulpif(global.isWatching, cached('jade')))
        .pipe(plugins.cached('jade'))

        //encuentra los ficheros que depende de los que han sido cambiados
        .pipe(plugins.jadeInheritance({ basedir: config.target.jadeFolder }))

        //filtra carpetas y archivos con guion bajo para no compilarlos
        .pipe(plugins.filter(function(file) {
            return !/\/_/.test(file.path) && !/^_/.test(file.relative);
        }))

        //compila el jade
        .pipe(plugins.jade({ pretty: true }))
        .pipe(gulp.dest(config.main))
        .pipe(plugins.browserSync.stream());
    });
};
