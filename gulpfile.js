const gulp = require('gulp');
const { src, dest, series, parallel, watch} = require('gulp');
const browsersync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

function browserSync(){
  return browsersync.init({
    server: {
      baseDir: './dist',
    },
    port: 3000,
  });
}

function htmlTask(){
  return src('src/*.html').pipe(htmlReplace({
    css: 'css/all-styles.css',
    js: 'js/bundle.js',
  })
  )
  .pipe(dest('dist/'))
  .pipe(browsersync.stream());
}

function prefixTask(){
  return src( 'src/css/input.css')
  .pipe(autoprefixer())
  .pipe(dest('dist/css/'))
  
}
function stylesTask(){
  return src([ 'src/css/main.css','src/css/*.css'])
  .pipe(sourcemaps.init())
  .pipe(concat('all-styles.css'))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/css/'))
  .pipe(browsersync.stream());
}
function lintTask(){
  return src('src/js/test.js')
  .pipe(eslint({}))
  .pipe(eslint.format())
  .pipe(dest('dist/js'));
}
function scriptsTask(){
  return src(['src/js/application.js', 'src/js/datafolder.js','src/js/participant.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
  .pipe(browsersync.stream());
}
function watchfiles(){
  watch('src/*.html',htmlTask);
  watch('src/css/*.css',stylesTask);
  watch('src/js/*.js',scriptsTask);
}
exports.prefix = prefixTask;
exports.lint = lintTask;
exports.html = htmlTask;
exports.styles = stylesTask;
exports.scripts = scriptsTask;
exports.watch = parallel(watchfiles,browserSync);
exports.dev = series(parallel(htmlTask,stylesTask,scriptsTask),parallel(watchfiles,browserSync));
exports.default = parallel(htmlTask,stylesTask,scriptsTask);