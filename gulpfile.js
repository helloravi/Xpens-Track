var gulp        = require('gulp');
var concat = require('gulp-concat');

var bowerDir = './bower_components';

var jsFiles = [
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    'app/js/src/app.js',
    'app/js/src/controllers/routeConfig.js',
]

var cssFiles = [
    './bower_components/bootstrap/dist/css/bootswatch-paper.css'
]

  gulp.task('scripts', function(){
        return gulp.src(jsFiles)
            .pipe(concat('main.js'))
            .pipe(gulp.dest('app/js'));
    });

  gulp.task('css', function(){
        return gulp.src(cssFiles)
            .pipe(concat('main.css'))
            .pipe(gulp.dest('app/css'));
    });

  gulp.task('watch', function() {
    gulp.watch('app/js/src/*.js', ['scripts']);
    gulp.watch('app/js/src/**/*.js', ['scripts']);
    gulp.watch('app/css/src/*.css', ['css']);
  });

// gulp.task('default', ['sass', 'serve']);
gulp.task('default', ['scripts','css', 'watch']);
