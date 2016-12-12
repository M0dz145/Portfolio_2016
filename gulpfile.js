// Configuration
var path = {
    css: 'css/',
    sass: 'css/',
    js: 'js/'
};

// Require
var gulp = require('gulp'),
    $    = require('gulp-load-plugins')();

// Tasks
gulp.task('sass', function(){
    gulp.src(path.sass + "app.sass")
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 30", "chrome >= 34", "safari >= 7", "opera >= 23", "ios >= 7", "android >= 4.4", "bb >= 10"]
        }))
        .pipe(gulp.dest(path.css))
        .pipe($.size())
});

gulp.task('default', function(){
    gulp.watch(path.sass + "*.sass", ['sass']);
});
