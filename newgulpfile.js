const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const sourcemaps = require('gulp-sourcemaps');

// Compile Sass & Inject Into Browser
gulp.task("sass", function () {
  return gulp
    .src(["scss/*.scss"])
    .pipe(sass())
    .pipe(gulp.dest("css"))
    .pipe(browserSync.stream());
});

gulp.task('css', () => {

  return gulp.src('src/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('precss'), require('autoprefixer')]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('postcss/'))
});

// Watch Sass & Serve
gulp.task("serve", ["sass"], function () {
  browserSync.init({
    server: "./"
  });

  gulp.watch(["scss/*.scss"], ["sass"]);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/*.js").on("change", browserSync.reload);
});

// Default Task
gulp.task("default", ["serve"]);