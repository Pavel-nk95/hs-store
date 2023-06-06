const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

function css() {
  return src('./src/sass/style.sass')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/'))
    .pipe(browserSync.stream());
}

function js() {
  return src('./src/js/script.js').pipe(plumber()).pipe(dest('./dist/')).pipe(browserSync.stream());
}

function html() {
  return src(['./src/index.pug', './src/catalog.pug'])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(dest('./dist/'));
}

exports.html = html;
exports.css = css;
exports.js = js;

exports.watch = function () {
  browserSync.init({
    server: './dist/',
    notify: false,
    open: true,
    cors: true,
  });

  watch(['./src/*.pug', './src/includes/*.pug'], html).on('change', browserSync.reload);
  watch('./src/sass/*.sass', css).on('change', browserSync.reload);
  watch('./src/js/*.js', js).on('change', browserSync.reload);
};
