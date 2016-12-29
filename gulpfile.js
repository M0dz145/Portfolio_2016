// Configuration
var path = {
    css: 'css/',
    sass: 'css/',
    js: {
        in: 'js/app.js',
        watch: 'js/**/*'
    },
    build: {
        css: 'build/css/',
        js: 'build/js/'
    }
};

// Require
var gulp       = require('gulp'),
    $          = require('gulp-load-plugins')();

// Tasks
gulp.task('sass', function() {
    return gulp.src(path.sass + "app.sass")
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 30", "chrome >= 34", "safari >= 7", "opera >= 23", "ios >= 7", "android >= 4.4", "bb >= 10"]
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe($.size())
});

gulp.task('browserify', function() {
    return gulp.src(path.js.in)
        .pipe($.browserify().on('error', console.error.bind(console)))
        .pipe(gulp.dest(path.build.js))
        .pipe($.size());
});

gulp.task('watch', function() {
    gulp.watch(path.sass + "**/*.sass", ['sass']);
    gulp.watch(path.js.watch, ['browserify']);
});

gulp.task('default', [
    'watch',
    'sass',
    'browserify'
]);