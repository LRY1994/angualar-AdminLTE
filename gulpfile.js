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
    ngAnnotate = require('gulp-ng-annotate'),
    es = require('event-stream'),
    processhtml = require('gulp-processhtml');

var cssFiles = [
	'app/libraries/bootstrap/css/bootstrap.min.css',
	'app/libraries/font-awesome-4.7.0/css/font-awesome.min.css',
	'app/libraries/datatables/dataTables.bootstrap.css',
	'app/libraries/AdminLTE/css/AdminLTE.min.css',
	'app/libraries/AdminLTE/css/skins/_all-skins.min.css',
	'app/libraries/iCheck/square/blue.css'//这个显示不出来
];
var ngScripts = [
	'app/index.js',	
	'app/configs/**/*.js',
	'app/services/**/*.js',	
	'app/components/**/*.js'		
		
];
var libScripts = [
	'app/libraries/jQuery/jquery-2.2.3.min.js',
	'app/libraries/bootstrap/js/bootstrap.min.js',
	'app/libraries/AdminLTE/js/app.min.js',
	'app/libraries/iCheck/icheck.min.js',
	'app/libraries/datatables/jquery.dataTables.min.js',
	'app/libraries/datatables/dataTables.bootstrap.min.js',
	'app/libraries/angular/angular.min.js',
	'app/libraries/angular/angular-ui-router.js'
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
	var ctpl = gulp.src(['app/components/*.html']) 			  
 			  .pipe(templateCache({                
                 root: 'components'
            }));
    var ptpl = gulp.src(['app/pages/*.html'])			  
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
    return gulp.src("app/index.html")
               .pipe(processhtml())
   			   .pipe(gulp.dest('./dist/'));
});

gulp.task('distFont',function(){
	 console.log('复制font-awesome：');
    return gulp.src(['app/libraries/font-awesome-4.7.0/fonts/*','app/libraries/bootstrap/fonts/*'])
    .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('distImg',function(){
	 console.log('复制img：');
    return gulp.src(['app/images/avatar2.png','app/images/user2-160x160.jpg'])
    .pipe(gulp.dest('./dist/images/'));
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