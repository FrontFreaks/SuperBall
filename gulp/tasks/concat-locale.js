module.exports = function(gulp, plugins){
    gulp.task('concat-locale', function(){
        gulp.src('dev/js/location/datepicker-locales/i18n/**/*.js')
                .pipe(plugins.concat('datepicker-language.js'))
                .pipe(gulp.dest('dev/js/location/datepicker-locales/'))
        }
    )
};
