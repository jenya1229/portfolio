const   gulp = require("gulp"),
        sass = require("gulp-sass"),
        autoprefixer = require("gulp-autoprefixer"),
        babel = require("gulp-babel"),
        gulpif = require("gulp-if"),
        uglify = require("gulp-uglify"),
        useref = require("gulp-useref"),
        fileinclude = require('gulp-file-include'),
        plumber = require('gulp-plumber'),
        browserSync = require("browser-sync").create();


gulp.task('html', function(){
  return gulp.src('src/html/*.html')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
   .pipe( gulp.dest('build') )
   .pipe( browserSync.stream() )
});


gulp.task('js', function(){
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
   .pipe(babel({presets: ['env']}))
   .pipe( gulp.dest('build/js') )
   .pipe( browserSync.stream() )
});


// SCSS
gulp.task("css", function(){
    return gulp.src('src/scss/**/*.scss')
      .pipe(sass({ outputStyle: 'expanded'}).on('error', sass.logError) )
      .pipe(autoprefixer({browsers: ['last 2 versions']}))
      .pipe(gulp.dest('build/css') )
      .pipe(browserSync.stream() )
});



gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'build'
      },
      open: false
   })
});


// Watch
gulp.task('watch', function(){
  gulp.watch('./src/scss/**/*.scss', ['css']);
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/js/**/*.js', ['js']);
});


gulp.task('default', ['browserSync', 'html', 'js', 'css', 'watch']);
