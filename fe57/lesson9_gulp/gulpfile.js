var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    csso = require('gulp-csso'),
    rimraf = require('rimraf'),
const imagemin = require('gulp-imagemin');

gulp.task('style', function () {
    gulp.src('./app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix({
            browsers: ['last 20 versions']
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
})

gulp.task('default', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./img/**/*.jpg'))
        .pipe(imagemin([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.jpegtran({ progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
        plugins: [
            { removeViewBox: true },
            { cleanupIDs: false }
        ]
    })
])));

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
})

gulp.task('build', function () {
    gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', csso()))
        .pipe(gulp.dest('./build'))
})

gulp.task('watch', function () {
    gulp.watch('./app/sass/**/*.sass', ['style']);
})

gulp.task('clean', function (cb) {
        rimraf(path.clean, cb);
     });


gulp.task('default', ['watch', 'server']);