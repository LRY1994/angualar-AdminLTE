/**
 * gulpfile.js
 * gulp脚本文件
 * 2017/4/9
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
    es = require('event-stream');

var cssFiles = [
	'libraries/bootstrap/css/bootstrap.min.css',
	'libraries/font-awesome-4.7.0/css/font-awesome.min.css',
	'libraries/datatables/dataTables.bootstrap.css',
	'libraries/AdminLTE/css/AdminLTE.min.css',
	'libraries/AdminLTE/css/skins/_all-skins.min.css',
	'libraries/iCheck/square/blue.css'//这个显示不出来
];
var ngScripts = [
	'index.js',	
	'configs/**/*.js',
	'services/**/*.js',	
	'components/**/*.js'		
		
];
var libScripts = [
	'libraries/jQuery/jquery-2.2.3.min.js',
	'libraries/bootstrap/js/bootstrap.min.js',
	'libraries/AdminLTE/js/app.min.js',
	'libraries/iCheck/icheck.min.js',
	'libraries/datatables/jquery.dataTables.min.js',
	'libraries/datatables/dataTables.bootstrap.min.js',
	'libraries/angular/angular.min.js',
	'libraries/angular/angular-ui-router.js'
];


gulp.task('jshint', function() {
	console.log("检查jhint:");
    return gulp.src(ngScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean',function(){
    console.log('清除输出目录：');   
    return del('./dist/**'); 
});


gulp.task('minifyLibScripts',function(){
	console.log('压缩libScripts：');
	return gulp.src(libScripts)
				.pipe(ngAnnotate())
//				.pipe(uglify())
    			.pipe(concat('lib.min.js')) 
    			.pipe(gulp.dest('./dist/js'))
    });
    
gulp.task('minifyNgScripts',function(){
	console.log("把HTML模板合并成一个文件");
	var ctpl = gulp.src(['./components/*.html'])
// 			  .pipe(templateCache());
 			  .pipe(templateCache({                
                 root: 'components'
            }));
    var ptpl = gulp.src(['./pages/*.html'])
// 			  .pipe(templateCache());
 			  .pipe(templateCache({                
                 root: 'pages'
            }));
 	console.log('压缩ngScripts：');
    return es.merge(es.merge(gulp.src(ngScripts),ctpl,ptpl)
    		  .pipe(ngAnnotate())
    		  .pipe(concat('ng.min.js'))  
    		  .pipe(gulp.dest('./dist/js')));
});

gulp.task('minifyCss',function(){
	console.log('压缩CSS：');
    return gulp.src(cssFiles)
    .pipe(minifyCss())
    .pipe(concat('all.min.css')) 
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('distHtml',function(){
	 console.log('复制index.html：');
    return gulp.src("index.html")
    .pipe(gulp.dest('dist/'))
});

gulp.task('distFont',function(){
	 console.log('复制font-awesome：');
    return gulp.src(['libraries/font-awesome-4.7.0/fonts/*','libraries/bootstrap/fonts/*'])
    .pipe(gulp.dest('dist/font/'));
});

gulp.task('distImg',function(){
	 console.log('复制img：');
    return gulp.src(['images/avatar2.png','images/user2-160x160.jpg'])
    .pipe(gulp.dest('dist/images/'));
});
/**
 * 构建
 * 指令:gulp build
 */
gulp.task('build',['clean','minifyLibScripts','minifyNgScripts',
					'minifyCss','distHtml','distFont','distImg']);
gulp.task("default", ['build']);
//gulp.task('watch',['watch:css','watch:ng','watch:html']);

//
//gulp.task('browser-sync', ["build","watch"], function() {
//  browserSync.init({
//      server: {
//          baseDir: ["./"]
//      },
//      middleware: [function(req, res, next) {
//          next();
//      }],
//      port: 80
//  });
//});
//
////监听css
//gulp.task("watch:css", function() {
//  var cssSrc = [
//      'app/css/bootstrap/**/*.css',
//      'app/css/Font-Awesome/**/*.css',
//      'app/css/system.css',
//      'app/css/**/*.css'
//  ];
//  gulp.watch(cssSrc,['minifyCss'], browserSync.reload);
//});
////监听js和html模板
//gulp.task("watch:ng", function() {
//  var jsSrc = [
//      '!libraries/**/*.js',        
//      './**/*.js'
//  ];
//  var tplSrc = './**/*.html';
//  gulp.watch(jsSrc,['minifyNgScripts'], browserSync.reload);
//  gulp.watch(tplSrc,['minifyNgScripts'], browserSync.reload);
//});
////监听html
//gulp.task("watch:html", function() {
//  var htmlSrc = ['index.html'];
//  gulp.watch(htmlSrc,['distHtml'], browserSync.reload);
//});
//
//process.on('uncaughtException', function(e){console.log(e.stack)})