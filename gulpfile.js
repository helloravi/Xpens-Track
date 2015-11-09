var gulp        = require('gulp');
var concat = require('gulp-concat');

var bowerDir = './bower_components';

var jsFiles = [
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './js/src/app.js',
    './js/src/controllers/routeConfig.js',
    './js/src/controllers/user-controller.js'
]

var cssFiles = [
    bowerDir + 'bootstrap/dist/css/bootstrap.css',
    bowerDir + 'bootswatch/flatly/bootstrap.css'
]

  gulp.task('scripts', function(){
        return gulp.src(jsFiles)
            .pipe(concat('main.js'))
            .pipe(gulp.dest('js'));
    });

  gulp.task('css', function(){
        return gulp.src(cssFiles)
            .pipe(concat('main.css'))
            .pipe(gulp.dest('css'));
    });

  gulp.task('watch', function() {
    gulp.watch('js/src/*.js', ['scripts']);
    gulp.watch('js/src/**/*.js', ['scripts']);
    gulp.watch('css/src/*.css', ['css']);
  });

// gulp.task('default', ['sass', 'serve']);
gulp.task('default', ['scripts', 'watch']);
