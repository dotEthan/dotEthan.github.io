const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
// const sourcemaps = require('gulp-sourcemaps'); 

// Compile Sass & Inject Into Browser
// gulp.task("sass", function () {
//   return gulp
//     .src(["scss/*.scss"])
//     .pipe(sass())
//     .pipe(postcss([postcssPresetEnv({ stage: 2 })]))
//     .pipe(gulp.dest("css"))
//     .pipe(browserSync.stream());
// });

// gulp.task('css', () => gulp.src('./css/*.css').pipe(
//   postcss([
//     postcssPresetEnv({ stage: 2 })
//   ])
// ).pipe(
//   gulp.dest('postcss')
// ));

gulp.task('sass', function () {
  var processors = [
    //see https://github.com/ai/browserslist#queries for autoprefixer queries
    // autoprefixer({ browsers: "last 3 versions" }),
    postcssPresetEnv({ stage: 1 }),
    // cssnano
  ];
  return gulp
    .src(["scss/*.scss"])
    .pipe(sass())
    .pipe(postcss(processors))
    // .pipe(cssnano())
    .pipe(gulp.dest('./postcss/css'))
    .pipe(browserSync.stream());
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