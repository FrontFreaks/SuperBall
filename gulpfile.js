var gulp = require('gulp');
var config = require('./gulp/config/config.js');
var functions = require('./gulp/config/functions.js');
//por defecto gulp-load-plugins solo carga los modulos con el prefijo gulp-, con pattern: '*' cargará todos
var plugins = require('gulp-load-plugins')({
    pattern: '*'
});

/**
 * TAREAS PRINCIPALES
 */

//INICIALIZA EL SERVER
require(config.tasks + '/serve')(gulp, plugins, config);

//WATCHES (vigila rutas y ejecuta acciones cuando detecta cambios)
require(config.tasks + '/watches')(gulp, plugins, config);

// compila y prefija sass a css y lo anto inyecta en los navegadores
require(config.tasks + '/sass')(gulp, plugins, config, functions);

//CACHEA POR PRIMERA VEZ EL JADE PARA EVITAR ESPERAS EN LA PRIMERA COMPILACIÓN
require(config.tasks + '/cacheJade')(gulp, plugins, config);

//COMPILA JADE
require(config.tasks + '/jade')(gulp, plugins, config, functions);


/**
 * DISTRIBUCIÓN
 */

//CREA LA CARPETA DE DISTRIBUCIÓN DE HTML
require(config.buildTask + '/html')(gulp, plugins, config);

//CREA LA CARPETA DE DISTRIBUCIÓN DE CSS
require(config.buildTask + '/css')(gulp, plugins, config);

//CREA LA CARPETA DE DISTRIBUCIÓN DE JS
require(config.buildTask + '/js')(gulp, plugins, config);

//CREA LA CARPETA DE DISTRIBUCIÓN DE IMG
require(config.buildTask + '/img')(gulp, plugins, config);

//CREA LA CARPETA DE DISTRIBUCIÓN DE BOWER
require(config.buildTask + '/bower')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO CSS
require(config.buildTask + '/staticsCSS')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO JS
require(config.buildTask + '/staticsJS')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO IMG
require(config.buildTask + '/staticsIMG')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO HTML
require(config.buildTask + '/staticsHTML')(gulp, plugins, config);

//CREA EL ARCHIVO ENTREGABLE DESARROLLO MAIN JS
require(config.buildTask + '/yargsJS')(gulp, plugins, config);


/**
 * COMPILACIÓN
 */

//COMPILA LOS ARCHIVOS HTML
require(config.minTask + '/html-min')(gulp, plugins, config);

//COMPILA LOS ARCHIVOS CSS
require(config.minTask + '/css-min')(gulp, plugins, config);

//COMPILA LOS ARCHIVOS JS
require(config.minTask + '/js-min')(gulp, plugins, config);

//COMPILA LOS ARCHIVOS IMG
require(config.minTask + '/img-min')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO CSS
require(config.minTask + '/staticsCSS-min')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO JS
require(config.minTask + '/staticsJS-min')(gulp, plugins, config);

//CREA LA CARPETA ENTREGABLE DESARROLLO IMG
require(config.minTask + '/staticsIMG-min')(gulp, plugins, config);

//CREA EL ARCHIVO ENTREGABLE DESARROLLO MAIN JS
require(config.minTask + '/yargs-min')(gulp, plugins, config);
//CREA EL ARCHIVO ENTREGABLE DESARROLLO MAIN JS
require(config.minTask + '/yargsJS-min')(gulp, plugins, config);

/**
 * OTROS
 */

//CREA CAPTURAS DE PANTALLA DE LAS PAGINAS INDICADAS
require(config.otherTasks + '/shot')(gulp, plugins, config);

//COMPRUEBA QUE EL CODIGO JS ESTA CORRECTAMENTE ESCRITO
require(config.otherTasks + '/lint')(gulp, plugins, config);

//Actualiza fichero css de Dropbox
require(config.otherTasks + '/upCloud')(gulp, plugins, config);


require(config.tasks + '/devjs-concat')(gulp, plugins);
require(config.tasks + '/js-concat')(gulp, plugins);
require(config.tasks + '/concat-locale')(gulp, plugins);
require(config.tasks + '/js-ofus')(gulp, plugins);
require(config.tasks + '/bower-libs-concat')(gulp, plugins);
require(config.tasks + '/jquery-concat')(gulp, plugins);


gulp.task('prebuild', ['sass', 'jade']);
gulp.task('statics', ['staticsCSS', 'staticsJS', 'staticsIMG', 'staticsHTML']);
gulp.task('build', ['prebuild', 'css', 'js', 'html', 'img', 'bower']);
gulp.task('buildmin', ['prebuild', 'cssmin', 'jsmin', 'htmlmin', 'img', 'bower']);

gulp.task('min', ['cssmin', 'jsmin','staticsCSS-min', 'staticsJS-min', 'staticsIMG-min']);

//gulp.task('server', ['serve', 'watch', 'cacheJade', 'sass', 'setWatch', 'jade']);
gulp.task('server', ['serve', 'watch', 'cacheJade', 'sass', 'jade']);
gulp.task('default', ['serve', 'watch', 'cacheJade']);

//Only to minify main.js
gulp.task('miniYargs',['yargs-min', 'yargsJS', 'yargsJS-min']);
