var main = "dev/",
    dist = "dist/";

module.exports = {
    tasks: "./gulp/tasks",
    buildTask: "./gulp/tasks/build",
    minTask: "./gulp/tasks/min",
    otherTasks: "./gulp/tasks/other",
    screenFolder: "./gulp/screenshots",
    main: main,
    dist: dist,
    target: {
        jade: main + 'jade/*.jade',
        jadeWatch: main + 'jade/**/*.jade',
        jadeFolder: main + 'jade/',
        html: main + '*.html',
        sass: main + 'scss/*.scss',
        sassWatch: main + 'scss/**/*.scss',
        css: main + 'css/**/*.css',
        cssAll: main + 'css/**/*',
        cssFolder: main + 'css/',
        js: main + "js/**/*.js",
        img: main + "assets/**/*",
        bower: main + "bower_components/**/*",
        dist: {
            html: dist,
            css: dist + "css/",
            js: dist + "js/",
            img: dist + "assets/",
            bower: dist + "bower_components/"
        }
    }
};
