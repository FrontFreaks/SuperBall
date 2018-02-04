module.exports = function(gulp, plugins, config) {
    gulp.task('watch', function() {
        gulp.watch([
            './dev/js/components/**.*',
            './dev/js/init.js'
        ], ['jsconcat']);
        gulp.watch(config.target.sassWatch, ['sass']);
        // gulp.watch(config.target.jadeWatch, ['setWatch', 'jade']);
        gulp.watch(config.target.jadeWatch, ['jade']);
    });
};
