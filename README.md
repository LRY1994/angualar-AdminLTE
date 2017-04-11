# angualar+AdminLTE
毕业设计，第一次用angular构建项目

gulp构建参考博客
http://www.cnblogs.com/caohenghu/p/5174024.html
http://www.open-open.com/lib/view/open1448188754393.html
http://www.tuicool.com/articles/UvAz2iN
http://www.cnblogs.com/2050/p/4198792.html
http://www.gulpjs.com.cn/docs/api/
https://segmentfault.com/a/1190000005704053


安装使用步骤
npm install---安装gulp
gulp clean ----第一次使用gulp不用这个
gulp build或者gulp
把dist/font改成dist/fonts---因为同名fonts复制不了
把ng.min.js里面的templateUrl全部改成"**.*"的形式才成正确加载------因为使用了templateCache
把dist/index.html里面的多余文件删掉，改成只有dist里面的css和js