module.exports = function(gulp, plugins, config, functions) {
    gulp.task('sass', function() {
        return gulp.src(config.target.sass)
            .pipe(plugins.plumber({ errorHandler: function(err){
                    return functions.errorHandler(gulp, plugins, config, err, this);
                }
            }))
            .pipe(plugins.changed(config.target.cssFolder))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.autoprefixer({
                browsers: ['last 3 versions'],
                cascade: false
            }))
            //.pipe(plugins.pixrem()) Descomentar para poder utilizar rem con ie8
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.target.cssFolder))
            .pipe(plugins.browserSync.stream());
    });
};
