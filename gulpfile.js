var gulp = require('gulp');

gulp.task('copy_wx',function(){
    gulp.src('lib/**/*')
        .pipe(gulp.dest('example/mp/wx/lib'));
});
gulp.task('copy_alipay',function(){
  gulp.src('lib/**/*')
      .pipe(gulp.dest('example/mp/alipay/lib'));
});
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  gulp.watch('lib/*',['copy_wx', 'copy_alipay']);
});



