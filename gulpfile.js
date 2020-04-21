const gulp = require('gulp'); // Поключаем Gulp

const fileinclude = require('gulp-file-include'); // Для подключения файлов друг в друга

const browserSync = require('browser-sync').create(); // Поключаем browserSync

const watch = require('gulp-watch');

const scss = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

// Задача для старта сервера 
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    })
});



// Таск для сборки HTML и шаблонов
gulp.task('html', function(callback) {

    return gulp.src('./app/html/*.html')
        .pipe(plunber({}))
        .pipe(fileinclude({ prefix: '@@' }))
        .pipe(gulp.dest('./app/'))
    callback();
});



gulp.task('default', gulp.parallel('server', 'watch'));



gulp.task('scss', function(callback) {
    return gulp.src('./app/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 4 versions']
        }))
        .pipe(gulp.dest('./app/css/'))
    callback();
});


gulp.task('watch', function() {
    watch(['./app/*.html', './app/**/*.css'], gulp.parallel(browserSync.reload));
});



gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./app/"
        }
    });
});