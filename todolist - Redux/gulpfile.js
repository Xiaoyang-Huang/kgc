var path = require('path');

var gulp = require('gulp');
var webpack = require('gulp-webpack');

var sass = require('gulp-sass');

var gulpPlumber = require('gulp-plumber');
var gulpWatch = require('gulp-watch');
var browserSync = require('browser-sync').create();

var webpackConfig = {
  output:{
    filename: 'index.js'
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

gulp.task('default', ['script', 'style'], function(){
  browserSync.init({
    server:{
      baseDir:'./www/'
    },
    open: false
  })
  gulpWatch(['script/**/*.jsx','script/**/*.js'], function(){gulp.start('script');});
  gulpWatch('./style/**/*.scss', function(){gulp.start('style');});
})

gulp.task('style', function(){
  gulp.src('./style/index.scss')
    .pipe(gulpPlumber())
    .pipe(sass())
    .pipe(gulp.dest('./www/dest/'))
    .pipe(browserSync.stream());
})

gulp.task('script', function(){
  gulp.src('./script/index.js')
    .pipe(gulpPlumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./www/dest/'))
    .pipe(browserSync.stream());
})
