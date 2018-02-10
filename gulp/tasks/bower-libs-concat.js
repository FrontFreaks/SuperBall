
 /*-------------------------------------------------
    # bower-libs-concat.js
--------------------------------------------------*/

 module.exports = function(gulp, plugins){
   gulp.task('bowerConcat', function() {
     return gulp.src([
       "./dev/bower_components/jquery/dist/jquery.js",
       // "./dev/bower_components/jquery-ui/jquery-ui.min.js",
       "./dev/bower_components/phaser-ce/build/phaser.min.js"
     ])
     // .pipe(plugins.uglify())
       .pipe(plugins.concat('libs.dependencies.js'))
       .pipe(gulp.dest('./dev/js/'));
   });
 };
