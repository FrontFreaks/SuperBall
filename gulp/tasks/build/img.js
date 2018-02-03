module.exports = function(gulp, plugins, config) {
    gulp.task('img', function() {
        gulp.src(config.target.img)
            .pipe(gulp.dest(config.target.dist.img));
    });
};
