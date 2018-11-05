const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const csswring = require('csswring');
var autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

gulp.task('styles', function () {
  const processors = [
    // csswring,
    // autoprefixer,
    postcssPresetEnv({ stage: 0 })
  ];

  return gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task("serve", ["styles"], function () {
  browserSync.init({
    server: "./"
  });

  gulp.watch(["scss/*.scss"], ["styles"]);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/*.js").on("change", browserSync.reload);
});

// Default Task
gulp.task("default", ["serve"]);