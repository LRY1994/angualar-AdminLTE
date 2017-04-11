/**
 * gulpfile.js
 * gulp脚本文件
 * 
 */
var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),
    templateCache = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate');
   

var cssFiles = [
//	'libraries/bootstrap/css/bootstrap.min.css',这个加入的话font-awesome的图显示不出来
	'libraries/datatables/dataTables.bootstrap.css',
	'libraries/AdminLTE/css/AdminLTE.min.css',
	'libraries/AdminLTE/css/skins/_all-skins.min.css'
//	'libraries/iCheck/square/blue.css'这个也是显示不出来
];
var jsFiles = [
	'libraries/angular/angular.min.js',
	'libraries/angular/angular-ui-router.js',
	'index.js',
	'configs/**/*.js',
	'services/**/*.js',	
	'components/**/*.js'		
		
];


/**
 * JS校验
 * 指令:gulp jshint
 */
gulp.task('jshint', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * 清除
 * 指令:gulp clean
 */
gulp.task('clean',function(){
    console.log('清除输出目录：');   
    return del('./dist/**'); 
});
/**
 * 构建
 * 指令:gulp build
 */
gulp.task('build',['clean'],function(){
	 console.log('压缩JS：');
	gulp.src(jsFiles)
	.pipe(ngAnnotate({single_quotes: true}))
    .pipe(concat('all.js')) // 合并 JavaScript ，并设置合并后的文件名
    .pipe(uglify()) // 执行 JavaScript 压缩
    .pipe(gulp.dest('./dist'));
    
    console.log('压缩CSS：');
    gulp.src(cssFiles)
    .pipe(concat('all.css')) // 合并 CSS ，并设置合并后的文件名
//  .pipe(minifyCss()) // 执行 CSS 压缩
    .pipe(gulp.dest('./dist));
    
    console.log('复制font-awesome：');
    gulp.src('libraries/font-awesome-4.7.0/**')
    .pipe(gulp.dest('./dist/font-awesome'));
});