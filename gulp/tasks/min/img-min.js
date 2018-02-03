module.exports = function(gulp, plugins, config) {
    gulp.task('imgmin', function() {
        return gulp.src(config.target.img)
            .pipe(plugins.imagemin({
                progressive: true,
                svgoPlugins: [{
                    removeViewBox: false
                }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(config.target.dist.img));
    });

};
