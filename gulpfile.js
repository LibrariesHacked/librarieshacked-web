var gulp = require('gulp');

var config = {
    nodeDir: './node_modules',
    nodePub: './themes/bootstrap/node'
};

gulp.task('nodeJs', function () {
    return gulp.src(config.nodeDir + '/fontawesome/fonts/*.*').pipe(gulp.dest(nodePub + '/fonts'));
});