var gulp        = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var bowerDir = './bower_components';

var jsFiles = [
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    'app/js/src/app.js',
    'app/js/src/controllers/routeConfig.js',
    'app/js/src/controllers/user-controller.js',
    'app/js/src/controllers/expense-controller.js',
    'app/js/src/services/user-service.js',
    'app/js/src/services/AuthenticationService.js'

]

  gulp.task('scripts', function(){
        return gulp.src(jsFiles)
            .pipe(concat('main.js'))
            .pipe(gulp.dest('app/js'));
    });

  gulp.task('sass', function () {
    return gulp.src('app/css/src/*.scss')
      .pipe(concat('main.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/css'));
  });

  gulp.task('watch', function() {
    gulp.watch('app/js/src/*.js', ['scripts']);
    gulp.watch('app/js/src/**/*.js', ['scripts']);
    gulp.watch('app/css/src/*.scss', ['sass']);
  });

// gulp.task('default', ['sass', 'serve']);
gulp.task('default', ['scripts', 'sass','watch']);
