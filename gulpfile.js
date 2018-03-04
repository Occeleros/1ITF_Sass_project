var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function () {
    browserSync.init({
        startPath: '/index.html',
        server: {
            baseDir: "./public_html/",
            directory: true
        }
    });
});

// Compile sass into CSS (/public_html/css/) & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        // outputStyle: nested (default), expanded, compact, compressed
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public_html/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('**/*.scss', {cwd: './scss/'}, ['sass']);
    gulp.watch('**/*.{html,js}', {cwd: './public_html/'}, browserSync.reload);
});

gulp.task('default', ['watch', 'browser-sync']);