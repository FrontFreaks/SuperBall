module.exports = function(gulp, plugins, config) {
    gulp.task('serve', function() {
        //inicia servidor
        plugins.browserSync.init({
            server: config.main,
            port: "8000",
            ghostMode: false,
            baseDir: config.main,
            directory: true,
            ui: false,
			reloadOnRestart: false
        });
    });
};
