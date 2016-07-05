var gulp = require('gulp'),     bower = require('gulp-bower');  var config = {
    bowerDir: './bower_components',
    bowerPublic: './themes/bootstrap/bower'
};

// Bower Install
gulp.task('bower', function () {
    return bower().pipe(gulp.dest(config.bowerDir))
});

gulp.task('bowerJs', function () {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/*.*').pipe(gulp.dest(bowerPublic + '/fonts'));
});