var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

gulp.task("copy-html", function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-assets", function () {
    return gulp.src('src/assets/*')
        .pipe(gulp.dest("dist/assests"));
});

gulp.task("default", ["copy-html", "copy-assets"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify, { targe: 'es5' })
        .bundle()
        .pipe(source('js/SimpleGame.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
});