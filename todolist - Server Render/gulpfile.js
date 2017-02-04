var path = require('path');

var gulp = require('gulp');
var webpack = require('gulp-webpack');

var sass = require('gulp-sass');

var gulpPlumber = require('gulp-plumber');
var gulpWatch = require('gulp-watch');
var express = require('gulp-express');

var webpackConfig = {
  output:{
    filename: 'index.js',
    libraryTarget:'umd'
  },
  devtool: 'inline-source-map',
  module:{
    loaders:[
      {test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  },
  resolve:{
    extensions:['','.js','.jsx']
  }
}

gulp.task('style', function(){
  return gulp.src('./style/index.scss')
    .pipe(gulpPlumber())
    .pipe(sass())
    .pipe(gulp.dest('./www/dest/'))
})

gulp.task('script', function(){
  return gulp.src('./script/template.jsx')
    .pipe(gulpPlumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./www/dest/'))
})

gulp.task('serve', ['script'], function(){
  express.run(['./index.js']);
  gulp.start('script');
  gulp.start('style');

})