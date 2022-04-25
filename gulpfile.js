// These include the dependencies installed (gulp, browser-sync, gulp-sass)
const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
//added 2022 for current versions
const sass        = require('gulp-sass')(require('sass'));
 // Gulp Sass Command/function -Compiles sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});
 // Adds the 'js' function (task) that will create the /app/js folder and put each of the listed javascript files in it
gulp.task('js', function() {
return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});
 // Gulp serve task command - Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));
// Gulp command "default" - starts local server, watches for Sass file changes and compiles them //’gulp.series’ combines task functions that will execute one after another - by adding in the 'js' function, we can work the js will execute.
gulp.task('default', gulp.series('js', 'serve'));
