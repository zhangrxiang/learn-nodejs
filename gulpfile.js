// 在 shell 中执行一个命令

var gulp = require('gulp');
var exec = require('child_process');
gulp.task('default', function (cb) {
    // 编译 Jekyll
    exec.exec('ls ', function (err, stdout) {
        if (err)
            return cb(err); // 返回 error
        console.log(stdout);
        cb(); // 完成 task
    });
});

gulp.task('assert', function (cb) {
    exec.exec('node assert/index.js', function (err, stdout) {
        if (err)
            return cb(err);
        else {
            console.log(stdout);
            cb();
        }
    })
});

