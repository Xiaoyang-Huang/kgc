var path = require('path');

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var express = require('gulp-express');

var sass = require('gulp-sass');

var gulpPlumber = require('gulp-plumber');
var gulpWatch = require('gulp-watch');

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
  gulp.src('./style/index.scss')
    .pipe(gulpPlumber())
    .pipe(sass())
    .pipe(gulp.dest('./www/dest/'))
})

gulp.task('script', function(){
  return gulp.src('./script/templete.jsx')
    .pipe(gulpPlumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./www/dest'))
})


gulp.task('serve', ['script'], function(){
  express.run(['./index.js']);
  gulp.start('script');
  gulp.start('style');

  gulpWatch(['script/**/*.jsx','script/**/*.js'], function(evt){
    gulp.start('script', function(){
      express.notify(evt);   
    });
  });

  gulpWatch('./style/**/*.scss', function(evt){
    gulp.start('style', function(){
      express.notify(evt);   
    });
  });
})
