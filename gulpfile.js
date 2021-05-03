const gulp = require('gulp');
const { src, dest, series, parallel } = require('gulp');

function html(){
  return src('src/*.html').pipe(dest('dist'));
}

function styles(){
  return src('src/css/*.html').pipe(dest('dist/css'));
}

function scripts(){
  return src('src/script/*.js').pipe(dest('dist/js'));
}

exports.default = parallel(html,styles,scripts);