
 /*-------------------------------------------------
    #bower-jquery-concat.js
--------------------------------------------------*/

 module.exports = function(gulp, plugins){
   gulp.task('jqueryConcat', function() {
     return gulp.src([
       //* Includes: core.js, widget.js, mouse.js, position.js, accordion.js, autocomplete.js, button.js, datepicker.js, dialog.js, draggable.js, droppable.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js, menu.js, progressbar.js, resizable.js, selectable.js, selectmenu.js, slider.js, sortable.js, spinner.js, tabs.js,
       // Not includes:  tooltip.js
       "./dev/bower_components/jquery-ui/ui/minified/core.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/widget.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/mouse.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/position.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/accordion.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/autocomplete.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/button.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/datepicker.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/dialog.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/draggable.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/droppable.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-blind.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-bounce.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-clip.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-drop.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-explode.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-fade.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-fold.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-highlight.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-puff.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-pulsate.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-scale.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-shake.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-size.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-slide.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/effect-transfer.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/menu.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/progressbar.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/resizable.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/selectable.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/selectmenu.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/slider.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/sortable.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/spinner.min.js",
       "./dev/bower_components/jquery-ui/ui/minified/tabs.min.js"
       // "./dev/bower_components/jquery-ui/ui/minified/tooltip.min.js"
     ])
     // .pipe(plugins.uglify())
       .pipe(plugins.concat('jquery.dependencies.min.js'))
       .pipe(gulp.dest('./dev/js/dev'));
   });
 };
