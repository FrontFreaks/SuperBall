module.exports = function(gulp, plugins, config) {
    gulp.task('upCloud', function() {
        gulp.src(config.target.cssFolder + "modules.css")
        .pipe(plugins.rename("dFront.css"))
        .pipe(gulp.dest(config.target.cloudFolder));
    });
};
