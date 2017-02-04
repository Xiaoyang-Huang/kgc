var gulp = require('gulp');

var sass = require('gulp-sass');

var hint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifycss = require('gulp-minify-css');
var contentHandle = require('./contentHandle.js');
// var insert = require('gulp-insert');

var stylePath = './style/*.scss';
var scriptPath = './script/**/*.js';

var browserSync = require('browser-sync').create();

gulp.task('default', ['script:pro', 'style:pro'])

gulp.task('default:dev', ['script:dev', 'style:dev'], function(){
	browserSync.init({
		server:{
			baseDir:'./'
		},
		open: false
	})
	gulp.watch(scriptPath, ['script:dev']);
	gulp.watch(stylePath, ['style:dev']);
})

gulp.task('style:dev', function(){
	return gulp.src(stylePath)
		.pipe(sass())
		.pipe(sourcemaps.init())
		.pipe(concat('index.css'))
		.pipe(minifycss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dest'))
		.pipe(browserSync.stream());
})

gulp.task('style:pro', function(){
	return gulp.src(stylePath)
		.pipe(sass())
		.pipe(concat('index.css'))
		.pipe(minifycss())
		.pipe(gulp.dest('./dest'))

})


// .pipe(insert.transform(function(contents, file){
// 			// console.log("insert", contents, file.relative);
// 			var path = file.relative;
// 			if(path != "index.js"){
// 				var prepend = 'registJS.add("' + path.replace("\\","/") + '", function(){\n';
// 	      var append = '\n});';
// 	      return prepend + contents + append;
//       }
// 			return contents
// 		}))
gulp.task('script:dev', function(){
	return gulp.src(scriptPath)
		.pipe(contentHandle)
		.pipe(sourcemaps.init())
		.pipe(hint())
		.pipe(hint.reporter('default'))
		.pipe(hint.reporter('fail'))
		.pipe(concat('index.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dest'))
		.pipe(browserSync.stream());
})

gulp.task('script:pro', function(){
	return gulp.src(scriptPath)
		.pipe(hint())
		.pipe(hint.reporter('fail'))
		.pipe(concat('index.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dest'))
})
